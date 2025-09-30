
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';

function useCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true });
        dispatch(setUserData(data));
      } catch (error) {
        console.error("Failed to fetch current user:", error.response?.data?.message || error.message);
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useCurrentUser;
export { useCurrentUser as getCurrentUser };


