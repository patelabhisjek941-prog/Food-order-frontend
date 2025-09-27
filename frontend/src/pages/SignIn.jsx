import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  // ✅ FIXED: Enhanced SignIn with proper error handling
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      if (data.user) {
        dispatch(setUserData(data.user));
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("token", data.user.token);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signin failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Enhanced Google Auth
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError("");
      
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const { data } = await axios.post("/api/auth/googleauth", {
          email: result.user.email,
          fullName: result.user.displayName,
          mobile: result.user.phoneNumber || ""
        });

        if (data.user && data.token) {
          dispatch(setUserData(data.user));
          localStorage.setItem("userData", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Google signin failed";
      setError(errorMessage);
      console.error("Google signin error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: bgColor }}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8" style={{ border: `1px solid ${borderColor}` }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Food Order & Delivery Web
        </h1>
        <p className="text-gray-600 mb-8">Welcome back! Please sign in to continue enjoying delicious food deliveries.</p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              style={{ borderColor }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500"
                style={{ borderColor }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <Link to="/forgot-password" style={{ color: primaryColor }} className="text-sm font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
            style={{ backgroundColor: primaryColor, color: "white" }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = hoverColor)}
            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = primaryColor)}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Google Sign In */}
        <button
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 disabled:opacity-50"
          style={{ borderColor }}
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>

        {/* Link to Signup */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold" style={{ color: primaryColor }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
