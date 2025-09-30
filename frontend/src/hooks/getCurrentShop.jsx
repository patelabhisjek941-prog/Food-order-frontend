// useCurrentShop.js
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { serverUrl } from '../App';
import { setShop } from '../redux/userSlice';

function useCurrentShop() {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user, shallowEqual);

  useEffect(() => {
    if (userData?.role === "owner") {
      const fetchShop = async () => {
        try {
          const { data } = await axios.get(`${serverUrl}/api/shop/getcurrent`, { withCredentials: true });
          if (data) {
            dispatch(setShop(data));
          } else {
            console.log("No shop found for this owner yet.");
            dispatch(setShop(null));
          }
        } catch (error) {
          console.error("Failed to fetch current shop:", error.response?.data?.message || error.message);
        }
      };

      fetchShop();
    }
  }, [userData, dispatch]);
}

export default useCurrentShop;
export { useCurrentShop as getCurrentShop };


// import axios from 'axios'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { serverUrl } from '../App'
// import { setShop } from '../redux/userSlice'

// function useCurrentShop() {
//     const dispatch = useDispatch()
//     const { userData } = useSelector(state => state.user)

//     useEffect(() => {
//         if (userData?.role === "owner") {
//             const fetchShop = async () => {
//                 try {
//                     const result = await axios.get(`${serverUrl}/api/shop/getcurrent`, { withCredentials: true })
//                     dispatch(setShop(result.data))
//                 } catch (err) {
//                     console.error("Failed to fetch shop:", err)
//                 }
//             }
//             fetchShop()
//         }
//     }, [userData, dispatch])
// }

// export default useCurrentShop
// export { useCurrentShop as getCurrentShop }

