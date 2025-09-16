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



import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { serverUrl } from "../App"
import { setAllShops } from "../redux/userSlice"

function useGetAllShops() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/getall`)
        if (result.data) {
          dispatch(setAllShops(result.data))
        }
      } catch (error) {
        console.error("Error fetching shops:", error.response?.data || error.message)
      }
    }

    fetchShops()
  }, [dispatch])
}

export default useGetAllShops
