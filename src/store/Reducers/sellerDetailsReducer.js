import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api";

export const get_seller_profile = createAsyncThunk(
  "sellerDetails/get_seller_profile",
  async (username, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller-get/${username}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_seller_profile_from_id = createAsyncThunk(
  "sellerDetails/get_seller_profile_from_id",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller-get-from-id/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerDetailsReducer = createSlice({
  name: "sellerDetails",
  initialState: {
    sellerInfo: "",
    errorMessage: "",
    successMessage: "",
    loader: false,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_seller_profile.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_seller_profile.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(get_seller_profile.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.sellerInfo = payload.user;
      })

      .addCase(get_seller_profile_from_id.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_seller_profile_from_id.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(get_seller_profile_from_id.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.sellerInfo = payload.user;
      });
  },
});

export const { messageClear } = sellerDetailsReducer.actions;
export default sellerDetailsReducer.reducer;
