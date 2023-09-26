import React, { useEffect, useState } from "react";
import Image from "../../../assets/Image.png";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Icons from "../../../components/Icons";
import WeatherForecastItem from "./WeatherForecastItem";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { weatherActions } from "../redux/weatherSlice";

const WeatherDetail = () => {
  const [currentType, setCurrentType] = useState("weakly");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.weather.isLoading);
  const weatherList = useSelector((state) => state.weather.forecasts);
  const currentWeather = useSelector((state) => state.weather.currentWeather);
  const error = useSelector((state) => state.weather.error);
  let timeoutId;

  useEffect(() => {
    if (error != "") {
      timeoutId = setTimeout(() => {
        dispatch(weatherActions.changeError());
      }, 3000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [error]);

  const chooseType = (type) => {
    if (type == "weakly") {
      setCurrentType("weakly");
      dispatch({
        type: "FETCH_WEATHER",
        payload: {
          q: weatherList.city.name,
        },
        style: "weakly",
      });
    } else {
      setCurrentType("hourly");
      dispatch({
        type: "FETCH_WEATHER",
        payload: {
          q: weatherList.city.name,
        },
        style: "hourly",
      });
    }
  };

  return (
    <div className="weather-detail">
      <img src={Image} alt="" className="weather-detail__background" />
      <Search />
      {currentWeather && !loading ? (
        <div className="weather-detail__wrapper">
          <div className="weather-detail__weather">
            <div className="weather-detail__weather-name">
              {weatherList.city.country}
            </div>
            <div className="weather-detail__weather-name">
              {weatherList.city.name}
            </div>

            <div className="weather-detail__weather-temperature">
              {currentWeather.main.temp.toFixed(0)}°C
            </div>
            <div className="weather-detail__weather-more">
              <span>
                Feel like: {currentWeather.main.feels_like.toFixed(0)}°C
              </span>
            </div>

            <div className="weather-detail__weather-des">
              {currentWeather?.weather[0]?.description}
            </div>

            <img
              src={`https://openweathermap.org/img/wn/${currentWeather?.weather[0]?.icon}@2x.png`}
              alt={currentWeather?.weather[0]?.description}
            />
          </div>
          <div className="weakly-forecast">
            <div className="weakly-forecast__choose">
              <div
                className={`weakly-forecast__choose-item ${
                  currentType == "hourly" ? "active" : ""
                }`}
                onClick={() => chooseType("hourly")}
              >
                Hourly forecast
              </div>
              <div
                className={`weakly-forecast__choose-item ${
                  currentType == "weakly" ? "active" : ""
                }`}
                onClick={() => chooseType("weakly")}
              >
                Weakly forecast
              </div>
            </div>
            <Swiper
              spaceBetween={12}
              slidesPerView={5}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {weatherList?.list.map((weather) => {
                return (
                  <SwiperSlide>
                    <WeatherForecastItem
                      weather={weather}
                      currentWeather={currentWeather}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      ) : (
        <div className="weather-detail__wrapper">
          <Icons name={"loading"} />
        </div>
      )}
      <div className={`alert ${error != "" ? "active" : ""}`}>
        <Alert severity="error">{error}</Alert>
      </div>
    </div>
  );
};

export default WeatherDetail;
