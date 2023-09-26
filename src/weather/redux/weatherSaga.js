import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { forecastApi, weatherApi } from "../../../services/api/weatherApi";
import { weatherActions } from "./weatherSlice";

function* handleFetchWeather(action) {
  try {
    yield put(weatherActions.weatherFetchAction());
    const res = yield call(weatherApi.fetchWeather, action.payload);
    yield put(weatherActions.weatherFetchSuccess(res.data));
    yield put(weatherActions.forecastFetchAction());
    const res2 = yield call(forecastApi.fetchForecast, { id: res.data.id });
    yield put(weatherActions.forecastFetchSuccess(res2.data));
  } catch (error) {
    yield put(weatherActions.weatherFetchError(error.response));
  }
}

export default function* weatherSaga() {
  yield takeLatest("FETCH_WEATHER", handleFetchWeather);
}
