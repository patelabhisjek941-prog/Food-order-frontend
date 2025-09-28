import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

function useCurrentUser() {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUsers = async () => {
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
            console.log(result.data)
            dispatch(setUserData(result.data))
        }
        fetchUsers()
    }, [dispatch])
}

export default useCurrentUser
export { useCurrentUser as getCurrentUser }

