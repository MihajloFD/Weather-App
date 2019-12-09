
import axios from 'axios';
import { WEATHER_BY_CITY, WEATHER_FORECAST, ERROR_MESSAGE } from './types';
import {WEATHER_SERVICE} from './services';
const WEATHER_API_KEY = 'a7968a53fc9e90b8f1244a4ba86a6239';

export const fetchWeatherInfo = ({city, lat, lon, units}) => {
    const query = lat ? `lat=${lat}&lon=${lon}` : `q=${city}`;
    const url = `${WEATHER_SERVICE}/weather?${query}&units=${units}&appid=${WEATHER_API_KEY}`
    return dispatch => {
        axios.get(url)
          .then(response => {
            dispatch({ type: WEATHER_BY_CITY, payload: response.data });
            dispatch({ type: ERROR_MESSAGE });
          })
          .catch(error => {
            dispatch({ type: ERROR_MESSAGE, payload: error.message });
          });
      };
}
export const fetch5DayWeatherForecast = ({city, units}) => {
  const query = `q=${city}`;
  const url = `${WEATHER_SERVICE}/forecast?${query}&units=${units}&appid=${WEATHER_API_KEY}`
  return dispatch => {
      axios.get(url)
        .then(response => {
          dispatch({ type: WEATHER_FORECAST, payload: response.data });
          dispatch({ type: ERROR_MESSAGE });
        })
        .catch(error => {
          dispatch({ type: ERROR_MESSAGE, payload: error.message });
        });
    };
}