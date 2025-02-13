import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_agent = createAsyncThunk(
  "agent/add-agent",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/agent-add", product, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_agents = createAsyncThunk(
  "agent/get-agents",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/agents-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        { withCredentials: true }
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_agent = createAsyncThunk(
  "agent/get-agent",
  async (agentId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/agent-get/${agentId}`, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_agent_profile = createAsyncThunk(
  "agent/get-agent-profile",
  async (agentId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/agent-get-profile/${agentId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_agent_profile_seller = createAsyncThunk(
  "agent/get-agent-profile-seller",
  async (agentId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/agent-get-profile-seller/${agentId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_agent = createAsyncThunk(
  "agent/update-agent",
  async (agent, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/agent-update`, agent, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_image_agent = createAsyncThunk(
  "agent/update-image-agent",
  async (
    { oldImage, newImage, agentId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("agentId", agentId);

      const { data } = await api.post(`/agent-image-update`, formData, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_agent = createAsyncThunk(
  "agent/delete-agent",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/agent-delete/`, info, {
        withCredentials: true,
      });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const agentReducer = createSlice({
  name: "agent",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    agents: [],
    agent: "",
    totalAgent: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_agent.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(add_agent.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(add_agent.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
      })

      .addCase(get_agents.fulfilled, (state, { payload }) => {
        state.totalAgent = payload.totalAgent;
        state.agents = payload.agents;
      })

      .addCase(get_agent.fulfilled, (state, { payload }) => {
        state.agent = payload.agent;
      })
      .addCase(get_agent.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })

      .addCase(get_agent_profile.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(get_agent_profile.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_agent_profile.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.agent = payload.agent;
      })

      .addCase(get_agent_profile_seller.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(get_agent_profile_seller.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(get_agent_profile_seller.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.agent = payload.agent;
      })

      .addCase(update_agent.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_agent.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_agent.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.agent = payload.agent;
        state.successMessage = payload.message;
      })
      .addCase(update_image_agent.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(update_image_agent.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(update_image_agent.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.agent = payload.agent;
        state.successMessage = payload.message;
      });
  },
});

export const { messageClear } = agentReducer.actions;
export default agentReducer.reducer;
