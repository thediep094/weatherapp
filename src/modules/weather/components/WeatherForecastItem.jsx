import React from "react";
import { formatDate, formatTimeToAMPM } from "../../../utils/convertTime";
import { useDispatch, useSelector } from "react-redux";
import { weatherActions } from "../redux/weatherSlice";
const WeatherForecastItem = ({ weather, currentWeather }) => {
  const dispatch = useDispatch();
  const changeWeather = (weather) => {
    dispatch(weatherActions.changeCurrentWeather(weather));
  };
  return (
    <div
      className={`weakly-forecast__item ${
        weather.dt == currentWeather?.dt ? "active" : ""
      }`}
      onClick={() => changeWeather(weather)}
    >
      <div className="weakly-forecast__item-time">
        {formatDate(weather?.dt_txt.split(" ")[0])}
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
        alt={weather?.weather[0]?.description}
      />
      <div className="weakly-forecast__item-time">
        {formatTimeToAMPM(weather?.dt_txt.split(" ")[1])}
      </div>
    </div>
  );
};

export default WeatherForecastItem;
