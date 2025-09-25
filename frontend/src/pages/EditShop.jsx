import axios from "axios";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { MdKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShop } from "../redux/userSlice";

export default function EditShop() {
  const { userData, shop } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(shop?.name || "");
  const [city, setCity] = useState(shop?.city || "");
  const [shopState, setShopState] = useState(shop?.state || "");
  const [address, setAddress] = useState(shop?.address || "");
  const [frontendImage, setFrontendImage] = useState(shop?.image || "");
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  // ✅ FIXED: Simplified API call - Axios interceptor handles auth automatically
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !city || !address) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("state", shopState);
      formData.append("address", address);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      // ✅ SIMPLIFIED: No need to manually set headers - interceptor handles it
      const result = await axios.post("/api/shop/editshop", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(setShop(result.data.shop || result.data));
      navigate("/");
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to save shop";
      setError(errorMessage);
      console.error("Shop save error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <button
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px]"
        onClick={() => navigate("/")}
      >
        <MdKeyboardBackspace className="w-[25px] h-[25px] text-[#ff4d2d]" />
      </button>
      
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            {!shop ? "Add Shop" : "Edit Shop"}
          </h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {frontendImage && (
              <div className="mt-3">
                <img
                  src={frontendImage}
                  alt="Shop Preview"
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="Enter city"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={shopState}
                onChange={(e) => setShopState(e.target.value)}
                placeholder="Enter state"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Enter address"
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Shop"}
          </button>
        </form>
      </div>
    </div>
  );
}
