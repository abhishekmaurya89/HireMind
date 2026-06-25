import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Feedback() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
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
        setFeedback(data.feedback);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-xl">
        Generating AI Feedback...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-xl p-8">
        <h1 className="text-4xl font-bold text-white mb-6">
          Interview Feedback
        </h1>
        <div className="bg-slate-800 rounded-lg p-6 whitespace-pre-wrap text-slate-200 leading-8">
          {feedback}
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
export default Feedback;
