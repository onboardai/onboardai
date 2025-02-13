import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api";

export const add_friend = createAsyncThunk(
  "boChat/add_friend",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/chat/bo/add-bo-friend", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_message = createAsyncThunk(
  "boChat/send_message",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/chat/bo/send-message-to-seller", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const boChatReducer = createSlice({
  name: "boChat",
  initialState: {
    my_friends: [],
    fb_messages: [],
    currentFd: "",
    successMessage: "",
    errorMessage: "",
    loader: false,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessageBO: (state, { payload }) => {
      state.fb_messages = [...state.fb_messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_friend.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(add_friend.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
        state.loader = false;
      })
      .addCase(add_friend.fulfilled, (state, { payload }) => {
        state.fb_messages = payload.messages;
        state.currentFd = payload.currentFd;
        state.my_friends = payload.MyFriends;
        state.loader = false;
      })

      .addCase(send_message.fulfilled, (state, { payload }) => {
        let tempFriends = state.my_friends;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }

        state.my_friends = tempFriends;
        state.fb_messages = [...state.fb_messages, payload.message];
        state.successMessage = "Message Send Success";
      });
    //   .addCase(bo_register.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.error;
    //   })
    //   .addCase(bo_register.fulfilled, (state, { payload }) => {
    //     state.loader = false;
    //     state.successMessage = payload.message;
    //   })
    //   .addCase(bo_profile_add.pending, (state, { payload }) => {
    //     state.loader = true;
    //   })
    //   .addCase(bo_profile_add.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.error;
    //   })
    //   .addCase(bo_profile_add.fulfilled, (state, { payload }) => {
    //     state.loader = false;
    //     state.userInfo = payload.userInfo;
    //     state.successMessage = payload.message;
    //   })
    //   .addCase(get_bo_info.fulfilled, (state, { payload }) => {
    //     state.loader = false;
    //     state.userInfo = payload.userInfo;
    //   })
    //   .addCase(bo_login.pending, (state, { payload }) => {
    //     state.loader = true;
    //   })
    //   .addCase(bo_login.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.error;
    //   })
    //   .addCase(bo_login.fulfilled, (state, { payload }) => {
    //     state.loader = false;
    //     state.successMessage = payload.message;
    //     state.token = payload.token;
    //     state.role = returnRole(payload.token);
    //   });
  },
});

export const { messageClear, updateMessageBO } = boChatReducer.actions;
export default boChatReducer.reducer;
