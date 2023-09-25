import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import weatherReducer from "../modules/weather/redux/weatherSlice";
import rootSaga from "./rootSaga";
const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware,
});
sagaMiddleware.run(rootSaga);
