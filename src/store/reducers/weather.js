import { WEATHER_BY_CITY, WEATHER_FORECAST } from '../../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
  case WEATHER_BY_CITY:
    return { ...state, weatherByCity: action.payload };
  case WEATHER_FORECAST:
    return {...state, weatherForecast: action.payload }
  default:
    return state;
  }
}