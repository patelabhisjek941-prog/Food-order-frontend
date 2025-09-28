import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { serverUrl } from '../App'

function useUpdateLocation() {
  const { userData, socket } = useSelector(state => state.user)
  useEffect(() => {

    async function updateMyLocation(lat, lng) {
      // API call
      axios.post(serverUrl + "/api/user/update-location", {
        latitude: lat,
        longitude: lng
      }, { withCredentials: true });

      // Socket emit
      socket?.emit("user:location:update", {
        latitude: lat,
        longitude: lng
      });
    }

    // Har thodi der me location bhejna
    navigator.geolocation.watchPosition(
      (pos) => {
        updateMyLocation(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => console.error(err),
      { enableHighAccuracy: false }
    );
  }, [userData])
}

export default useUpdateLocation
export { useUpdateLocation as updateLocation }


