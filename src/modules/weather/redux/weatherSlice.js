import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weather: null,
  forecasts: null,
  currentWeather: null,
  currentType: "weakly",
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
      state.error = "";
    },
    weatherFetchError: (state, action) => {
      if (action.payload?.data?.message) {
        state.error = action.payload?.data?.message;
      } else {
        state.error = "Fail to fetch data";
      }
      state.isLoading = false;
    },

    forecastFetchAction: (state) => {
      state.isLoading = true;
    },
    forecastFetchSuccess: (state, action) => {
      state.isLoading = false;
      state.forecasts = action.payload;
      state.currentWeather = action.payload.list[0];
      state.error = "";
    },
    forecastFetchError: (state) => {
      state.error = "Fail to fetch data";
      state.isLoading = false;
    },

    changeCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    changeError: (state) => {
      state.error = "";
    },

    changeType: (state, action) => {
      console.log(action.payload);
      state.currentType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
