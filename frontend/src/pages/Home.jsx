// import { useSelector } from 'react-redux';
// // import UserDashboard from '../components/userDashboard';
// import UserDashboard from "../components/UserDashboard";


// import DeliveryBoy from '../components/DeliveryBoy';
// import Footer from '../components/Footer';
// import OwnerDashboard from '../components/OwnerDashboard';
// function Home() {
//   const { userData } = useSelector(state => state.user)
//   return (
//     <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
//       {userData?.role == "user" && <UserDashboard />}
//       {userData?.role == "owner" && <OwnerDashboard />}
//       {userData?.role == "deliveryBoy" && <DeliveryBoy />}
//       <Footer />
//     </div>
//   )
// }

// export default Home


import { useSelector } from 'react-redux';
import UserDashboard from "../components/UserDashboard";
import DeliveryBoy from '../components/DeliveryBoy';
import OwnerDashboard from '../components/OwnerDashboard';
import Footer from '../components/Footer';

function Home() {
  const { userData, shop } = useSelector(state => state.user);

  // While user data or shop data is loading
  if (!userData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
      {userData.role === "user" && <UserDashboard />}
      {userData.role === "deliveryBoy" && <DeliveryBoy />}
      {userData.role === "owner" && <OwnerDashboard />}
      <Footer />
    </div>
  );
}

export default Home;
