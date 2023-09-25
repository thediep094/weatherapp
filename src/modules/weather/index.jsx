import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WeatherDetail from "./components/WeatherDetail";
const locationList = [
  {
    id: 1581130,
    text: "Hà Nội",
    value: {
      lat: 21.028511,
      lon: 105.804817,
    },
  },
  {
    id: 1566083,
    text: "TP.Hồ Chí Minh",
    value: {
      lat: 10.762622,
      lon: 106.660172,
    },
  },
  {
    id: 1580240,
    text: "Huế",
    value: {
      lat: 16.463713,
      lon: 107.590866,
    },
  },
];

const WeatherModule = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "FETCH_WEATHER",
      payload: {
        id: locationList[0].id,
      },
    });
  }, []);

  return (
    <div className="container">
      <WeatherDetail />
    </div>
  );
};

export default WeatherModule;
