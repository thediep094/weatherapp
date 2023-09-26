import React, { useEffect } from "react";
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
