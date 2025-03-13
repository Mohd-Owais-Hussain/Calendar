import { createSlice } from "@reduxjs/toolkit";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calendarDataSlice = createSlice({
  name: "calendarDataSlice",
  initialState: {
    calendarYear: new Date().getFullYear(),
    calendarMonth: months[new Date().getMonth()],
  },
  reducers: {
    setCalendarYear: (state, action) => {
      state.calendarYear = action.payload;
    },
    setCalendarMonth: (state, action) => {
      state.calendarMonth = months[action.payload];
    },
  },
});

export default calendarDataSlice.reducer;

export const { setCalendarYear, setCalendarMonth } = calendarDataSlice.actions;
