import { useState } from "react";
import axios from "axios";
import { useAppContext } from "../Contexts/AppContext.jsx";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const { user, setUser, token, setToken } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await axios.post(`${API_URL}/api/auth/login`, formData);
    setUser(response.data.user);
    setToken(response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">HireMind</h1>
          <p className="text-slate-400 mt-2">
            Real-Time Technical Interview Platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-slate-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Don't have an account?{" "}
          <span className="text-indigo-500 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
