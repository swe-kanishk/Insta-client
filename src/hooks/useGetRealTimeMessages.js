import { addUnreadMessage, setMessages } from "@/redux/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRealTimeMessages = () => {
  const dispatch = useDispatch();
  const {socket} = useSelector(store => store.socketio)
  const {messages} = useSelector(store => store.chat)
  const { selectedUser } = useSelector(store => store.auth);


  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
        dispatch(setMessages([...messages, newMessage]))
        const { senderId } = newMessage;
        if (senderId !== selectedUser?._id) {
          dispatch(addUnreadMessage({ userId: senderId }));
        }
    })

    return () => {
        socket?.off('newMessage')
    }
  }, [messages, setMessages]);
};

export default useGetRealTimeMessages;