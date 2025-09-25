import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import EditShop from "./pages/EditShop";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrders from "./pages/MyOrders";
import PendingOrders from "./pages/PendingOrders";
import MyDeliveredOrders from "./pages/MyDeliveredOrders";
import TrackOrderPage from "./pages/TrackOrderPage";
import ShopItems from "./pages/ShopItems";

import { setSocket, setUserData, clearUserData } from "./redux/userSlice";

export const serverUrl = "https://food-order-backend-1-zakd.onrender.com";

// ✅ FIXED: Enhanced Axios Configuration
axios.defaults.baseURL = serverUrl;
axios.defaults.withCredentials = true;

// Request interceptor
axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// ✅ NEW: Response interceptor to handle auth errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid or expired
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

function App() {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);

  // ✅ FIXED: Load user data from localStorage on app start
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    const savedToken = localStorage.getItem("token");
    
    if (savedUserData && savedToken) {
      try {
        const userData = JSON.parse(savedUserData);
        dispatch(setUserData(userData));
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("userData");
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const socketInstance = io(serverUrl, { 
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
    
    dispatch(setSocket(socketInstance));

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      if (userData?._id) {
        socketInstance.emit("identify", { userId: userData._id });
      }
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [dispatch, userData?._id]);

  return (
    <Routes>
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to="/" />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" />} />
      <Route path="/editshop" element={userData ? <EditShop /> : <Navigate to="/signin" />} />
      <Route path="/additem" element={userData ? <AddItem /> : <Navigate to="/signin" />} />
      <Route path="/edititem/:itemId" element={userData ? <EditItem /> : <Navigate to="/signin" />} />
      <Route path="/cart" element={userData ? <CartPage /> : <Navigate to="/signin" />} />
      <Route path="/checkout" element={userData ? <CheckoutPage /> : <Navigate to="/signin" />} />
      <Route path="/order-placed" element={userData ? <OrderPlaced /> : <Navigate to="/signin" />} />
      <Route path="/my-orders" element={userData ? <MyOrders /> : <Navigate to="/signin" />} />
      <Route path="/pending-orders" element={userData ? <PendingOrders /> : <Navigate to="/signin" />} />
      <Route path="/my-delivered-orders" element={userData ? <MyDeliveredOrders /> : <Navigate to="/signin" />} />
      <Route path="/track-order/:orderId" element={userData ? <TrackOrderPage /> : <Navigate to="/signin" />} />
      <Route path="/shop-items/:shopId" element={userData ? <ShopItems /> : <Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
