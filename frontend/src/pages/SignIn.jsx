import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { auth, provider } from "../../utils/firebase";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Professional Food Delivery Theme
  const primaryColor = "#ff4d2d"; // rich orange
  const hoverColor = "#e64323"; // darker orange
  const bgColor = "#fff9f6"; // light off-white background
  const borderColor = "#ddd";
  const dispatch = useDispatch()


  //  const handleSignIn = async () => {
  //   try {
  //     const result = await axios.post(
  //       `${serverUrl}/api/auth/signin`,
  //       { email, password }
  //     );

  //     // ✅ Save token in localStorage
  //     if (result.data.token) {
  //       localStorage.setItem("token", result.data.token);
  //     }

  //     // ✅ Save user in Redux
  //     dispatch(setUserData(result.data.user));

  //     navigate("/"); // redirect
  //   } catch (error) {
  //     console.error(error.response?.data || error.message);
  //     setError(error.response?.data?.message || "Login failed");
  //   }
  // };

  // const handleGoogleAuth = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);

  //     if (result) {
  //       const { data } = await axios.post(
  //         `${serverUrl}/api/auth/googleauth`,
  //         { email: result.user.email }
  //       );

  //       // ✅ Save token
  //       if (data.token) {
  //         localStorage.setItem("token", data.token);
  //       }

  //       dispatch(setUserData(data.user));
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error(error.response?.data || error.message);
  //     setError("Google sign-in failed");
  //   }
  // };

  
  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }      
    

      );
      // Save token
    if (result.data.token) {
      localStorage.setItem("token", result.data.token);
    }

      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      if (result) {
        const { data } = await axios.post(`${serverUrl}/api/auth/googleauth`, {
          email: result.user.email,
        }, { withCredentials: true })
        dispatch(setUserData(data))
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        {/* Brand Heading */}
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Food Order & Delivery
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome back! Please sign in to continue enjoying delicious food
          deliveries.
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
            style={{ borderColor: borderColor }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500"
              style={{ borderColor: borderColor }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            style={{ color: primaryColor }}
            className="text-sm font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          className="cursor-pointer w-full font-semibold py-2 rounded-lg transition duration-200"
          style={{ backgroundColor: primaryColor, color: "white" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = hoverColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = primaryColor)
          }
          onClick={handleSignIn}
        >
          Sign In
        </button>

        {/* Google Auth */}
        <button
          className="cursor-pointer w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200"
          style={{ borderColor: borderColor }}
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={20} />
          <span className="font-medium text-gray-700">
            Sign in with Google
          </span>
        </button>



        {/* No account yet */}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold"
            style={{ color: primaryColor }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}





// import axios from "axios";
// import { signInWithPopup } from "firebase/auth";
// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, provider } from "../../utils/firebase";
// import { serverUrl } from "../App";
// import { setUserData } from "../redux/userSlice";

// export default function SignIn() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Theme colors
//   const primaryColor = "#ff4d2d"; // rich orange
//   const hoverColor = "#e64323"; // darker orange
//   const bgColor = "#fff9f6"; // light off-white background
//   const borderColor = "#ddd";

//   // Email/password sign in
//   const handleSignIn = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       const result = await axios.post(`${serverUrl}/api/auth/signin`, { email, password });

//       if (result.data.token) {
//         localStorage.setItem("token", result.data.token);
//       }

//       dispatch(setUserData(result.data.user));
//       navigate("/");
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Google sign-in
//   const handleGoogleAuth = async () => {
//     setError("");
//     setLoading(true);
//     try {
//       const result = await signInWithPopup(auth, provider);

//       if (result) {
//         const { data } = await axios.post(`${serverUrl}/api/auth/googleauth`, {
//           email: result.user.email,
//         });

//         if (data.token) {
//           localStorage.setItem("token", data.token);
//         }

//         dispatch(setUserData(data.user));
//         navigate("/");
//       }
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       setError("Google sign-in failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Spinner component
//   const Spinner = () => (
//     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//   );

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center p-4"
//       style={{ backgroundColor: bgColor }}
//     >
//       <div
//         className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
//         style={{ border: `1px solid ${borderColor}` }}
//       >
//         <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
//           Food Order & Delivery
//         </h1>
//         <p className="text-gray-600 mb-4">
//           Welcome back! Please sign in to continue enjoying delicious food deliveries.
//         </p>

//         {/* Error message */}
//         {error && <p className="text-red-500 mb-2">{error}</p>}

//         {/* Email */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-1">Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
//             style={{ borderColor: borderColor }}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-2">
//           <label className="block text-gray-700 font-medium mb-1">Password</label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-orange-500"
//               style={{ borderColor: borderColor }}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2.5 text-gray-500"
//             >
//               {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
//             </button>
//           </div>
//         </div>

//         {/* Forgot Password */}
//         <div className="text-right mb-4">
//           <Link
//             to="/forgot-password"
//             style={{ color: primaryColor }}
//             className="text-sm font-medium hover:underline"
//           >
//             Forgot Password?
//           </Link>
//         </div>

//         {/* Sign In Button */}
//         <button
//           className={`flex items-center justify-center w-full font-semibold py-2 rounded-lg transition duration-200 ${
//             loading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//           style={{ backgroundColor: primaryColor, color: "white" }}
//           onMouseOver={(e) =>
//             !loading && (e.currentTarget.style.backgroundColor = hoverColor)
//           }
//           onMouseOut={(e) =>
//             !loading && (e.currentTarget.style.backgroundColor = primaryColor)
//           }
//           onClick={handleSignIn}
//           disabled={loading}
//         >
//           {loading ? <Spinner /> : "Sign In"}
//         </button>

//         {/* Google Auth */}
//         <button
//           className={`flex items-center justify-center w-full mt-4 gap-2 border rounded-lg px-4 py-2 transition duration-200 ${
//             loading ? "opacity-70 cursor-not-allowed" : ""
//           }`}
//           style={{ borderColor: borderColor }}
//           onClick={handleGoogleAuth}
//           disabled={loading}
//         >
//           {loading ? (
//             <Spinner />
//           ) : (
//             <>
//               <FcGoogle size={20} />
//               <span className="font-medium text-gray-700">Sign in with Google</span>
//             </>
//           )}
//         </button>

//         {/* No account */}
//         <p className="mt-6 text-center text-gray-600">
//           Don’t have an account?{" "}
//           <Link
//             to="/signup"
//             className="font-semibold"
//             style={{ color: primaryColor }}
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


