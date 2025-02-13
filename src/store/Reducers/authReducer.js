import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      console.log(info);
      const { data } = await api.post("/seller-register", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post("/seller-login", info, {
        withCredentials: true,
      });
      console.log(data);
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/get-user", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_info_add = createAsyncThunk(
  "auth/profile_info_add",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/profile-info-add", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_user_image = createAsyncThunk(
  "auth/update-user-image",
  async (
    { oldImage, newImage, userId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("userId", userId);

      const { data } = await api.post(`/user-image-update`, formData, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_user = createAsyncThunk(
  "auth/update-user",
  async (user, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/user-update`, user, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const change_password = createAsyncThunk(
  "auth/change_password",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/change-password", info, {
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
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    role: returnRole(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(admin_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(admin_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })

      .addCase(seller_register.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })

      .addCase(seller_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(seller_login.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(seller_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.token = payload.token;
        state.role = returnRole(payload.token);
      })
      .addCase(get_user_info.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
      })

      .addCase(profile_info_add.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(profile_info_add.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(profile_info_add.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
        state.successMessage = payload.message;
      })

      .addCase(update_user_image.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_user_image.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_user_image.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.seller;
        state.successMessage = payload.message;
      })

      .addCase(update_user.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_user.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_user.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.seller;
        state.successMessage = payload.message;
      })

      .addCase(change_password.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(change_password.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(change_password.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;



// export const createSellerProfile = async (req, res) => {
//   const { id } = req;
//   const form = formidable({ multiples: true });

//   form.parse(req, async (err, field, files) => {
//     let {
//       name,
//       username,
//       description,
//       industryExpertise,
//       mainAISpecializations,
//       aiTools,
//       teamSize,
//       pricingModel,
//       targetBusinessSize,
//       previousProjects,
//       location,
//       additionalInfo,
//     } = field;
//     let { images } = files;
//     name = name.trim();

//     cloudinary.config({
//       cloud_name: process.env.cloud_name,
//       api_key: process.env.api_key,
//       api_secret: process.env.api_secret,
//       secure: true,
//     });

//     try {

//       const existingUser = await Seller.findOne({
//         "agencyInfo.username": username,
//       });
//       if (existingUser) {
//         return responseReturn(res, 400, { error: "Username already exists" });
//       }

//       let imageUrl = [];

//       if (!Array.isArray(images)) {
//         images = [images];
//       }

//       for (let i = 0; i < images.length; i++) {
//         const result = await cloudinary.uploader.upload(images[i].filepath, {
//           folder: "aaprofiles",
//         });
//         imageUrl.push(result.url);
//       }

//       await Seller.findByIdAndUpdate(id, {
//         agencyInfo: {
//           name,
//           username,
//           description: description.trim(),
//           industryExpertise,
//           mainAISpecializations,
//           aiTools,
//           teamSize,
//           pricingModel,
//           targetBusinessSize,
//           previousProjects,
//           location,
//           additionalInfo,
//           agencyLogo: imageUrl,
//         },
//       });
//       const userInfo = await Seller.findById(id);
//       responseReturn(res, 201, {
//         message: "Profile Info Added Successfully",
//         userInfo,
//       });
//     } catch (error) {
//       responseReturn(res, 500, { error: error.message });
//     }
//   });
// };