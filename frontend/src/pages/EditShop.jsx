// import axios from "axios";
// import { useState } from "react";
// import { FaUtensils } from "react-icons/fa";
// import { MdKeyboardBackspace } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { serverUrl } from "../App";
// import { setShop } from "../redux/userSlice";

// export default function EditShop() {
//   const { userData, shop } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Rename "state" to "shopState" to avoid reserved keyword conflict
//   const [name, setName] = useState(shop?.name || "");
//   const [city, setCity] = useState(shop?.city || "");
//   const [shopState, setShopState] = useState(shop?.state || "");
//   const [address, setAddress] = useState(shop?.address || "");
//   const [frontendImage, setFrontendImage] = useState(shop?.image || "");
//   const [backendImage, setBackendImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setBackendImage(file);
//     setFrontendImage(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("city", city);
//       formData.append("state", shopState); // use renamed variable
//       formData.append("address", address);
//       if (backendImage) formData.append("image", backendImage);

//       // Get token from Redux or localStorage
//       const token = userData?.token || localStorage.getItem("token");

//       const result = await axios.post(`${serverUrl}/api/shop/editshop`, formData, {
//         headers: {
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         withCredentials: true, // keep if you rely on cookie auth
//       });

//       dispatch(setShop(result.data));
//       console.log("Shop saved:", result.data);
//     } catch (error) {
//       console.error("AXIOS ERROR:", error.message);
//       console.log("Response data:", error.response?.data);
//       console.log("Response status:", error.response?.status);
//     }
//   };

//   return (
//     <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
//       <div
//         className="absolute top-[20px] left-[20px] z-[10] mb-[10px]"
//         onClick={() => navigate("/")}
//       >
//         <MdKeyboardBackspace className="w-[25px] h-[25px] text-[#ff4d2d]" />
//       </div>
//       <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
//         <div className="flex flex-col items-center mb-6">
//           <div className="bg-orange-100 p-4 rounded-full mb-4">
//             <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
//           </div>
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             {!shop ? "Add Shop" : "Edit Shop"}
//           </h2>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               placeholder="Enter Shop Name"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Shop Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//             {frontendImage && (
//               <div className="mt-3">
//                 <img
//                   src={frontendImage}
//                   alt="Shop Preview"
//                   className="w-full h-48 object-cover rounded-lg border"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 required
//                 placeholder="Enter city"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
//               <input
//                 type="text"
//                 name="state"
//                 value={shopState} // use renamed variable
//                 onChange={(e) => setShopState(e.target.value)}
//                 required
//                 placeholder="Enter state"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//             <textarea
//               name="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//               placeholder="Enter address"
//               rows="3"
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200"
//           >
//             Save
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUtensils } from "react-icons/fa";
import { MdKeyboardBackspace } from "react-icons/md";
import { serverUrl } from "../App";
import { setShop } from "../redux/userSlice";

export default function EditShop() {
  const { userData, shop } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(shop?.name || "");
  const [city, setCity] = useState(shop?.city || "");
  const [shopState, setShopState] = useState(shop?.state || "");
  const [address, setAddress] = useState(shop?.address || "");
  const [frontendImage, setFrontendImage] = useState(shop?.image || "");
  const [backendImage, setBackendImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("state", shopState);
      formData.append("address", address);
      if (backendImage) formData.append("image", backendImage);

      const token = userData?.token || localStorage.getItem("token");

      const { data } = await axios.post(`${serverUrl}/api/shop/editshop`, formData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });

      dispatch(setShop(data));
      console.log("Shop saved:", data);
    } catch (error) {
      console.error("Error saving shop:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div className="absolute top-[20px] left-[20px] z-[10]" onClick={() => navigate("/")}>
        <MdKeyboardBackspace className="w-[25px] h-[25px] text-[#ff4d2d]" />
      </div>
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">{shop ? "Edit Shop" : "Add Shop"}</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input type="text" value={city} onChange={e => setCity(e.target.value)} required
              placeholder="Enter City" className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input type="text" value={shopState} onChange={e => setShopState(e.target.value)} required
              placeholder="Enter State" className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} required
              placeholder="Enter Address" className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-bold transition-all">
            Save Shop
          </button>
        </form>
      </div>
    </div>
  );
}

