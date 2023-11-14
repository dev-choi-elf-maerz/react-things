
import React, { useState } from 'react'
import './Weather.css';

import Clear from '../Assets/clear.png';
import Cloud from '../Assets/cloud.png';
import Drizzle from '../Assets/drizzle.png';
import Humidity from '../Assets/humidity.png';
import Rain from '../Assets/rain.png';
import Snow from '../Assets/snow.png';
import Wind from '../Assets/wind.png';
import Search from '../Assets/search.png';

const Weather = () => {

    const [ wicon, setWicon ] = useState(Cloud);
    const APIKEY = 'a6e48eaa2294cfc44017f64ec2439d6d';
    const humidity = document.getElementsByClassName('humidity-percent');
    const wind = document.getElementsByClassName('wind-speed');
    const temprature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-location');
    const element = document.getElementsByClassName('cityName');

    const weatherIcon = (icon) => {

        if (icon === '01d' || icon === '01n') {
            setWicon(Clear);
        } else if (icon === '02d' || icon === '02n') {
            setWicon(Cloud);
        } else if (icon === '03d' || icon === '03n') {
            setWicon(Drizzle);
        } else if (icon === '04d' || icon === '04n') {
            setWicon(Drizzle);
        } else if (icon === '09d' || icon === '09n') {
            setWicon(Rain);
        } else if (icon === '10d' || icon === '10n') {
            setWicon(Rain);
        } else if (icon === '13d' || icon === '13n') {
            setWicon(Snow);
        } else {
            setWicon(Clear);
        }
    }

    const showInfor = (data) => {

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp) + " °C";
        location[0].innerHTML = data.name;
        weatherIcon(data.weather[0].icon);
    }
    
    const search = async () => {

        if (element[0].value === '') return 0;

        const cityName = element[0].value;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric&lang=kr`);
        const data = await response.json();
        
        showInfor(data);
    }
        
    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityName" placeholder='Search' />
                <div className="search-icon">
                    <img src={Search} alt="" className="" onClick={search}/>
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" className="" />
            </div>
            <div className="weather-temp"></div>
            <div className="weather-location"></div>
            <div className="data-container">
                <div className="element">
                    <img src={Humidity} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent"></div>
                        <div className="text">습도</div>
                    </div>
                </div>
                <div className="element">
                    <img src={Wind} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-speed"></div>
                        <div className="text">풍속</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather