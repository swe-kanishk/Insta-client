import { createSlice } from "@reduxjs/toolkit";

const realTimeNotificationSlice = createSlice({
  name: "realTimeNotification",
  initialState: {
    likeNotification: [],
  },
  reducers: {
    setLikeNotification: (state, action) => {
      state.likeNotification = state.likeNotification || [];
      if (action.payload.type === "like") {
        state.likeNotification.push(action.payload);
      } else if (action.payload.type === "dislike") {
        state.likeNotification = state.likeNotification.filter((item) => item.userId !== action.payload.userId)
      }
    },
  },
});

export const {setLikeNotification} = realTimeNotificationSlice.actions
export default realTimeNotificationSlice.reducer