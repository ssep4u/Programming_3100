import { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

const Card = styled.div`
    width: 320px;
    padding: 24px;
    border-radius: 20px;
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    color: white;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const Temperature = styled.h1`
    font-size: 48px;
    margin: 10px 0;
`;

const Info = styled.p`
    margin: 6px 0;
`;

const WeatherIcon = styled.img`
    width: 100px;
`;

export default function Weather() {
    const [weatherState, setWeatherState] = useState({
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        desc: '',
        icon: '',
        loading: true,
    });

    useEffect(() => {
        getWeather(setWeatherState);
    }, [])

    return (
        <Container>
            {weatherState.loading ? (
                <h3>날씨 정보를 불러오는 중...</h3>
            ) : (
                <Card>
                    <h2>📍 서울</h2>

                    <WeatherIcon
                        src={`https://openweathermap.org/img/wn/${weatherState.icon}@2x.png`}
                        alt={weatherState.desc}
                    />

                    <Temperature>
                        {Math.round(weatherState.temp)}°C
                    </Temperature>

                    <Info>{weatherState.desc}</Info>

                    <Info>
                        🌡 최고기온 : {Math.round(weatherState.temp_max)}°C
                    </Info>

                    <Info>
                        🥶 최저기온 : {Math.round(weatherState.temp_min)}°C
                    </Info>

                    <Info>
                        💧 습도 : {weatherState.humidity}%
                    </Info>
                </Card>
            )}
        </Container>
    );
}

function getWeather(setWeatherState) {
    const cityName = 'Seoul';
    const apiKey = import.meta.env.VITE_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    //위에서 만든 상태 변수에 값을 전달
    axios
        .get(url)
        .then((responseData) => {
            console.log(responseData);
            const data = responseData.data;
            setWeatherState({
                temp: data.main.temp,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                humidity: data.main.humidity,
                desc: data.weather[0].description,
                icon: data.weather[0].icon,
                loading: false,
            });
        })
        .catch((error) => console.log(error));
}