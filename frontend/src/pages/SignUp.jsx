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

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

  // ✅ FIXED: Enhanced SignUp
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!fullName || !email || !password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/signup", {
        fullName,
        email,
        mobile,
        password,
        role,
      });

      if (data.user && data.token) {
        dispatch(setUserData(data.user));
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      console.error("Signup error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Enhanced Google SignUp
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError("");
      
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const { data } = await axios.post("/api/auth/googleauth", {
          fullName: result.user.displayName || "Google User",
          email: result.user.email,
          mobile: result.user.phoneNumber || mobile || "",
          role: role,
        });

        if (data.user && data.token) {
          dispatch(setUserData(data.user));
          localStorage.setItem("userData", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Google signup failed";
      setError(errorMessage);
      console.error("Google signup error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: bgColor }}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8" style={{ border: `1px solid ${borderColor}` }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>Food Order & Delivery Web</h1>
        <p className="text-gray-600 mb-8">Create your account to start enjoying delicious food deliveries.</p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Full Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              style={{ borderColor }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email *</label>
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

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
              style={{ borderColor }}
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password (min. 6 characters)"
                className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500"
                style={{ borderColor }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
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

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Role *</label>
            <div className="flex gap-2">
              {["user", "vendor", "deliveryBoy"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors capitalize"
                  style={role === r ? 
                    { backgroundColor: primaryColor, color: "white" } : 
                    { borderColor, color: "#333" }
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
            style={{ backgroundColor: primaryColor, color: "white" }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = hoverColor)}
            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = primaryColor)}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <button
          disabled={loading}
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 disabled:opacity-50"
          style={{ borderColor }}
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span className="font-medium text-gray-700">Sign up with Google</span>
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/signin" className="font-semibold" style={{ color: primaryColor }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
