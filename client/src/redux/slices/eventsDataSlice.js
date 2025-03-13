import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const fetchEventData = createAsyncThunk(
  "fetch/events",
  async ({ year, month }) => {
    try {
      const response = await axiosClient.get("/calendar/events", {
        params: { year, month },
      });
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

const eventsDataSlice = createSlice({
  name: "eventsDataSlice",
  initialState: {
    events: [],
  },
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    editSingleEvent: (state, action) => {
      const eventToChange = state.events.findIndex(
        (event) => event._id === action.payload._id
      );
      state.events[eventToChange] = action.payload;
    },
    deleteSingleEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventData.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(fetchEventData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default eventsDataSlice.reducer;

export const { addEvent, editSingleEvent, deleteSingleEvent } =
  eventsDataSlice.actions;
