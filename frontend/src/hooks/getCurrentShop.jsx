import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setShop } from '../redux/userSlice'

function getCurrentShop() {
    const dispatch = useDispatch()
    const { userData, city } = useSelector(state => state.user)
    useEffect(() => {
        if (userData?.role == "owner") {
            const fetchShop = async () => {
                const result = await axios.get(`${serverUrl}/api/shop/getcurrent`, { withCredentials: true })

                dispatch(setShop(result.data))
            }
            fetchShop()
        }

    }, [userData])
}

export default getCurrentShop
