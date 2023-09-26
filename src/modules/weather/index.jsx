import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeatherDetail from "./components/WeatherDetail";
import "./styles/Search.scss";
import "./styles/WeatherDetail.scss";

const WeatherModule = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "FETCH_WEATHER",
      payload: {
        q: "hanoi",
      },
      style: "weakly",
    });
  }, []);

  return (
    <div className="container">
      <WeatherDetail />
    </div>
  );
};

export default WeatherModule;
