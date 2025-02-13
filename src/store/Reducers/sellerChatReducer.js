import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api";

export const get_bos = createAsyncThunk(
  "sellerChat/get_bos",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/get-bos/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_bo_message = createAsyncThunk(
  "sellerChat/get_bo_message",
  async (boId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/get-bo-message/${boId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_message_to_bo = createAsyncThunk(
  "sellerChat/send_message_to_bo",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/chat/seller/send-message-to-bo`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const send_message = createAsyncThunk(
//   "boChat/send_message",
//   async (info, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.post("/chat/bo/send-message-to-seller", info, {
//         withCredentials: true,
//       });
//       return fulfillWithValue(data);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const sellerChatReducer = createSlice({
  name: "sellerChat",
  initialState: {
    bos: [],
    messages: [],
    activeBO: [],
    activeSeller: [],
    friends: [],
    currentSeller: {},
    currentBO: {},
    sellers: [],
    successMessage: "",
    errorMessage: "",
    loader: false,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessageSeller: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_bos.fulfilled, (state, { payload }) => {
        state.bos = payload.bos;
      })

      .addCase(get_bo_message.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
        state.currentBO = payload.currentBO;
      })

      .addCase(send_message_to_bo.fulfilled, (state, { payload }) => {
        let tempFriends = state.bos;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }

        state.bos = tempFriends;
        state.messages = [...state.messages, payload.message];
        state.successMessage = "Message Send Success";
      });
    //   .addCase(add_friend.rejected, (state, { payload }) => {
    //     state.errorMessage = payload.error;
    //     state.loader = false;
    //   })
    //   .addCase(add_friend.fulfilled, (state, { payload }) => {
    //     state.fb_messages = payload.messages;
    //     state.currentFd = payload.currentFd;
    //     state.my_friends = payload.MyFriends;
    //     state.loader = false;
    //   })
    //   .addCase(send_message.fulfilled, (state, { payload }) => {
    //     let tempFriends = state.my_friends;
    //     let index = tempFriends.findIndex(
    //       (f) => f.fdId === payload.message.receiverId
    //     );
    //     while (index > 0) {
    //       let temp = tempFriends[index];
    //       tempFriends[index] = tempFriends[index - 1];
    //       tempFriends[index - 1] = temp;
    //       index--;
    //     }
    //     state.my_friends = tempFriends;
    //     state.fb_messages = [...state.fb_messages, payload.message]
    //     state.successMessage = "Message Send Success";
    //   });
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

export const { messageClear, updateMessageSeller } = sellerChatReducer.actions;
export default sellerChatReducer.reducer;
