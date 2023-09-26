import axios from "axios";
import { API_KEY, API_PREFIX } from "../../common/index";
export const weatherApi = {
  fetchWeather(params) {
    const url = `${API_PREFIX}/data/2.5/weather`;
    return axios.get(url, {
      params: {
        ...params,
        appid: API_KEY,
        lang: "vi",
        units: "metric",
      },
    });
  },
};

export const forecastApi = {
  fetchForecast(params) {
    const url = `${API_PREFIX}/data/2.5/forecast`;
    return axios.get(url, {
      params: {
        ...params,
        appid: API_KEY,
        lang: "vi",
        units: "metric",
      },
    });
  },
  fetchForecastHourly(params) {
    const url = `${API_PREFIX}/data/2.5/forecast/hourly`;
    return axios.get(url, {
      params: {
        ...params,
        appid: API_KEY,
        lang: "vi",
        units: "metric",
      },
    });
  },
};
