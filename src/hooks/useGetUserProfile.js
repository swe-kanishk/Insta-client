import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const getUserProfile = async (userId) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`https://insta-backend-flws.onrender.com/api/v1/user/${userId}/profile`, {
          withCredentials: true,
          headers: { Authorization : token }
        });
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, [userId]);
};

export default getUserProfile;