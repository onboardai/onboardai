import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api";

export const bo_register = createAsyncThunk(
  "boAuth/bo_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await api.post("/bo/bo-register", info, {
        withCredentials: true,
      });
      localStorage.setItem("boToken", data.token);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const bo_profile_add = createAsyncThunk(
  "boAuth/bo_profile_Add",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/bo/bo-profile-add", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_bo_info = createAsyncThunk(
  "boAuth/get_bo_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/bo/get-bo", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const bo_login = createAsyncThunk(
  "boAuth/bo_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/bo/bo-login", info, {
        withCredentials: true,
      });
      console.log(data);
      localStorage.setItem("boToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_bo_image = createAsyncThunk(
  "boAuth/update-bo-image",
  async (
    { oldImage, newImage, userId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("userId", userId);

      const { data } = await api.post(`/bo/bo-image-update`, formData, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_bo = createAsyncThunk(
  "boAuth/update-bo",
  async (user, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/bo/bo-update`, user, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const change_password_bo = createAsyncThunk(
  "boAuth/change_password_bo",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/bo/change-password-bo", info, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

const returnRole = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expireTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expireTime) {
      localStorage.removeItem("boToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

const decodeBOToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo;
  } else {
    return "";
  }
};

export const boAuthReducer = createSlice({
  name: "boAuth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "", //decodeBOToken(localStorage.getItem("boToken"))
    role: returnRole(localStorage.getItem("boToken")),
    boToken: localStorage.getItem("boToken"),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bo_register.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(bo_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(bo_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })

      .addCase(bo_profile_add.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(bo_profile_add.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(bo_profile_add.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      })

      .addCase(get_bo_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
      })

      .addCase(bo_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(bo_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(bo_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })

      .addCase(update_bo_image.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_bo_image.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_bo_image.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.bo;
        state.successMessage = payload.message;
      })

      .addCase(update_bo.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_bo.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_bo.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.bo;
        state.successMessage = payload.message;
      })

      .addCase(change_password_bo.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(change_password_bo.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(change_password_bo.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      });
  },
});

export const { messageClear } = boAuthReducer.actions;
export default boAuthReducer.reducer;
