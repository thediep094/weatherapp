import { all } from "redux-saga/effects";
import weatherSaga from "../modules/weather/redux/weatherSaga";

export default function* rootSaga() {
  yield all([weatherSaga()]);
}
