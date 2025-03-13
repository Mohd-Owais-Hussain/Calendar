import { configureStore } from "@reduxjs/toolkit";
import calendarDataReducer from "./slices/calendarDataSlice";
import eventsDataReducer from "./slices/eventsDataSlice";

export default configureStore({
  reducer: {
    calendarDataReducer,
    eventsDataReducer,
  },
});
