import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import getCity from './hooks/getCity'
import getCurrentShop from './hooks/getCurrentShop'
import getCurrentUser from './hooks/getCurrentUser'
import EditShop from './pages/EditShop'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { setSocket } from './redux/userSlice'

import { io } from 'socket.io-client'
import getItemsByCity from './hooks/getItemsByCity'
import getOwnerPendingOrders from './hooks/getOwnerPendingOrders'
import getShopsByCity from './hooks/getShopsByCity'
import updateLocation from './hooks/updateLocation'
import AddItem from './pages/AddItem'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import EditItem from "./pages/EditItem";

// import EditItem from './pages/editItem'
import MyDeliveredOrders from './pages/MyDeliveredOrders'
import MyOrders from './pages/MyOrders'
import OrderPlaced from './pages/OrderPlaced'
import PendingOrders from './pages/PendingOrders'
import ShopItems from './pages/ShopItems'
import TrackOrderPage from './pages/TrackOrderPage'
export const serverUrl = import.meta.env.VITE_SERVER_URL;

// export const serverUrl = import.meta.process.env.VITE_SERVER_URL

function App() {
  const { userData, allShops, socket } = useSelector(state => state.user)

  getCurrentUser();
  getCity()
  getCurrentShop();
  getShopsByCity();
  getItemsByCity();
  getOwnerPendingOrders()
  updateLocation()

  const dispatch = useDispatch()
  useEffect(() => {
    const socketInstance = io(serverUrl, { withCredentials: true });
    dispatch(setSocket(socketInstance));

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      if (userData?._id) {
        socketInstance.emit("identify", { userId: userData._id });
      }
    });


    return () => {
      socketInstance.disconnect();
    };
  }, [userData?._id]);

  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to={"/signin"} />} />
      <Route path='/editshop' element={userData ? <EditShop /> : <Navigate to={"/signin"} />} />
      <Route path='/additem' element={userData ? <AddItem /> : <Navigate to={"/signin"} />} />
      <Route path='/edititem/:itemId' element={userData ? <EditItem /> : <Navigate to={"/signin"} />} />
      <Route path='/cart' element={userData ? <CartPage /> : <Navigate to={"/signin"} />} />
      <Route path='/checkout' element={userData ? <CheckoutPage /> : <Navigate to={"/signin"} />} />
      <Route path='/order-placed' element={userData ? <OrderPlaced /> : <Navigate to={"/signin"} />} />
      <Route path='/my-orders' element={userData ? <MyOrders /> : <Navigate to={"/signin"} />} />
      <Route path='/pending-orders' element={userData ? <PendingOrders /> : <Navigate to={"/signin"} />} />
      <Route path='/my-delivered-orders' element={userData ? <MyDeliveredOrders /> : <Navigate to={"/signin"} />} />
      <Route path='/track-order/:orderId' element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"} />} />
      <Route path='/shop-items/:shopId' element={userData ? <ShopItems /> : <Navigate to={"/signin"} />} />
    </Routes>
  )
}

export default App
