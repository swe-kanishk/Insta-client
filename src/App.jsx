import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MainLayout from "./components/MainLayout";
import Home from "./components/Home";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { setSocket } from "./redux/socketSlice.js";
import { setOnlineUsers } from "./redux/chatSlice.js";
import { setLikeNotification } from "./redux/realTimeNotificationSlice.js";
import ProtectedRoutes from "./components/ProtectedRoutes";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: "/",
        element: <ProtectedRoutes><Home /></ProtectedRoutes>,
      },
      {
        path: "/profile/:id",
        element: <ProtectedRoutes><Profile /></ProtectedRoutes>,
      },
      {
        path: "/account/edit",
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>,
      },
      {
        path: "/chat",
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
function App() {
  const { user } = useSelector((store) => store.auth);
  const {socket} = useSelector(store => store.socketio)
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io("https://insta-backend-flws.onrender.com", {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      dispatch(setSocket(socketio));

      // listening all events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        console.log('new notification', notification)
        dispatch(setLikeNotification(notification))
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if(socket){
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
