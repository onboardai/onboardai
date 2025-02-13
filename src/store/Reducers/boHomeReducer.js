import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const query_agents = createAsyncThunk(
  "agent/query_agents",
  async (query, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/bo/query-agents?department=${query.department}&&sortBudget=${
          query.sortBudget
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ""
        }`
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const boHomeReducer = createSlice({
  name: "boHome",
  initialState: {
    agent: {},
    agents: [],
    totalAgent: 0,
    parPage: 3,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(query_agents.fulfilled, (state, { payload }) => {
      state.agents = payload.agents;
      state.totalAgent = payload.totalAgent;
      state.parPage = payload.parPage;
    });
  },
});

export const { messageClear } = boHomeReducer.actions;
export default boHomeReducer.reducer;
