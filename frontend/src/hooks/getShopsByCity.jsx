import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setShopsOfCity } from '../redux/userSlice'

function useShopsByCity() {
    const dispatch = useDispatch()
    const { city, userData } = useSelector(state => state.user)
    useEffect(() => {
        if (userData?.role == "user") {
            const fetchShops = async () => {
                const result = await axios.get(`${serverUrl}/api/shop/getshopsbycity/${city}`, { withCredentials: true })
                dispatch(setShopsOfCity(result.data))
            }
            fetchShops()
        }

    }, [city, userData,dispatch])
}

export default useShopsByCity
export { useShopsByCity as getShopsByCity }

