import React, { useState, useEffect } from "react";
import axios from "axios";
import * as config from "../../config";

import "./Weather.scss";

const getWeather = async () => {
    const response: any = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=Suwon&units=metric&appid=${config.WEATEHR_API_KEY}`
    );
    return response;
};

const WeatherCard = (props: any) => {
    const {temp, icon} = props;
    return <div className="weather__card">
        <div className="weather__icon">
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather Icon" />
        </div>
        <div className="weather__info">
            <span className="temp">{temp}°C</span>
            <span className="location">KR, Suwon</span>
        </div>
    </div>;
};

const Weather = () => {
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        getWeather().then((data) => {
            setWeather(data.data);
        });
    }, []);

    if (weather === null) {
        return <div className="weather"></div>;
    } else {
        return (
            <div className={"weather weather-showing"}>
                <WeatherCard temp={weather.main.temp} icon={weather.weather[0].icon} />
            </div>
        );
    }
};

export default Weather;
