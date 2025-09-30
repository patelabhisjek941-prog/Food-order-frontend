import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setShop } from '../redux/userSlice'

function useCurrentShop() {
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

export default useCurrentShop
export { useCurrentShop as getCurrentShop }

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

