import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: null,
  currentWeather: null,
  isLoading: false,
  error: "",
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    weatherFetchAction: (state) => {
      state.isLoading = true;
    },
    weatherFetchSuccess: (state, action) => {
      state.isLoading = false;
      state.weather = action.payload;
      state.currentWeather = action.payload.list[0];
      state.error = "";
    },
    weatherFetchError: (state) => {
      state.error = "Fail to fetch data";
      state.isLoading = false;
    },

    changeCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
