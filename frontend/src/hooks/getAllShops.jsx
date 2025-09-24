// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { serverUrl } from '../App'
// import { setAllShops } from '../redux/userSlice'

// function getAllShops() {
//    const dispatch = useDispatch()
//    useEffect(() => {
//       const fetchShops = async () => {
//          const result = await axios.get(`${serverUrl}/api/shop/getall`, { withCredentials: true })
//          if (result) {
//             dispatch(setAllShops(result.data))
//          }

//       }
//       fetchShops()
//    }, [])
// }

// export default getAllShops;

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverUrl } from "../App";
import { setAllShops } from "../redux/userSlice";

function getAllShops() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ get token from storage

        const result = await axios.get(
          `${serverUrl}/api/shop/getAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ send token
            },
            withCredentials: true, // in case backend uses cookies also
          }
        );

        if (result) {
          dispatch(setAllShops(result.data));
        }
      } catch (err) {
        console.error("Error fetching shops:", err.response?.data || err.message);
      }
    };

    fetchShops();
  }, []);

  return null;
}

export default getAllShops;



