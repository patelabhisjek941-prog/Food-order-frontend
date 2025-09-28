import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setItemsOfCity } from '../redux/userSlice'

function useItemsByCity() {
    const dispatch = useDispatch()
    const { city, userData } = useSelector(state => state.user)
    useEffect(() => {
        if (userData?.role == "user") {
            const fetchItems = async () => {
                const result = await axios.get(`${serverUrl}/api/item/getitemsbycity/${city}`, { withCredentials: true })
                dispatch(setItemsOfCity(result.data))
                console.log(result.data)
            }
            fetchItems()
        }

    }, [city, userData,dispatch])
}

export default useItemsByCity
export { useItemsByCity as getItemsByCity }

