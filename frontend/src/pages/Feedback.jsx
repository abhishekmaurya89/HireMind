import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Feedback() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.post(
          `${API_URL}/api/ai/feedback`,
          { roomId },
          {
            headers: {
              Authorization: token,
            },
          },
        );
        console.log(data);
        setFeedback(data.feedback);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [roomId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-5 text-lg font-medium">Generating AI Feedback...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-white">AI Interview Report</h1>

          <p className="text-indigo-100 mt-2">Room ID: {roomId}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              ⭐ Overall Rating
            </h2>

            <p className="text-6xl font-bold text-indigo-400">
              {feedback.rating}
              <span className="text-2xl text-slate-400">/10</span>
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              ✅ Correctness
            </h2>

            <p className="text-slate-300">{feedback.correctness}</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              ⚡ Time Complexity
            </h2>

            <p className="text-2xl text-green-400 font-semibold">
              {feedback.timeComplexity}
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              💾 Space Complexity
            </h2>

            <p className="text-2xl text-cyan-400 font-semibold">
              {feedback.spaceComplexity}
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              💪 Strengths
            </h2>

            <ul className="space-y-2">
              {feedback.strengths.map((item, index) => (
                <li key={index} className="text-slate-300">
                  • {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              ⚠ Weaknesses
            </h2>

            <ul className="space-y-2">
              {feedback.weaknesses.map((item, index) => (
                <li key={index} className="text-slate-300">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 mt-6">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            🚀 Suggested Improvements
          </h2>

          <ul className="space-y-2">
            {feedback.suggestions.map((item, index) => (
              <li key={index} className="text-slate-300">
                • {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-lg text-white font-medium"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
