import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const getAllPosts = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("https://insta-backend-flws.onrender.com/api/v1/post/all", {
          withCredentials: true,
          headers: { Authorization : token }
        });
        if (res.data.success) {
          dispatch(setPosts(res.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPosts();
  }, []);
};

export default getAllPosts;