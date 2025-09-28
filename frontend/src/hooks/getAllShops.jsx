import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App'
import { setAllShops } from '../redux/userSlice'

function useAllShops() {
   const dispatch = useDispatch()
   useEffect(() => {
      const fetchShops = async () => {
         const result = await axios.get(`${serverUrl}/api/shop/getall`, { withCredentials: true })
         if (result) {
            dispatch(setAllShops(result.data))
         }

      }
      fetchShops()
   }, [dispatch])
}

export default useAllShops
export { useAllShops as getAllShops }

