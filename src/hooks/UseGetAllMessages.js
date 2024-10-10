import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getAllMessages = () => {
  const { selectedUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        const res = await axios.get(
          `https://insta-backend-flws.onrender.com/api/v1/message/all/${selectedUser?._id}`,
          {
            withCredentials: true,
            headers: { Authorization: token },
          }
        );
        if (res.data.success) {
            console.log('response is ', res.data)
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllMessages();
  }, [selectedUser]);
};

export default getAllMessages;