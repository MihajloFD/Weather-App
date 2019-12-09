import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchWeatherInfo, fetch5DayWeatherForecast } from '../../actions/weather';
import '../../app.less';
import Switch from '../../components/switch/switch';
const DailyWeather = () => {
    const dispatch = useDispatch();
    
    const { weatherByCity } = useSelector(state => state.weather);
    const { weatherForecast } = useSelector(state => state.weather);
    const { errorMessage } = useSelector(state => state.errorMessage);
    
    const {name = '', main = {}, weather={}, wind={}, clouds={}} = {...weatherByCity};
  
    const success = (pos) => {
    const {latitude, longitude} = pos.coords;
        dispatch(fetchWeatherInfo({lat: latitude, lon: longitude, units: units}));
    }
    const error = () => {
        dispatch(fetchWeatherInfo({city: 'Plovdiv', units: units}));
    }

    useEffect(() => {   
        navigator.geolocation.getCurrentPosition(success, error);
      }, []);
    
        useEffect(() => {
          setCityName(name)
        },[name])

      
      const [cityName, setCityName] = useState(name);
      const [units, setUnits] = useState('metric');
      const [detail, setDetail] = useState(false);

    const handleOnChange = e => {
      setCityName(e.target.value)
    }
    const handleUnits = () => {
      const currentUnits = units === 'metric' ? 'imperial' : 'metric';
      setUnits(currentUnits)
      dispatch(fetchWeatherInfo({city: cityName, units: currentUnits}));
      dispatch(fetch5DayWeatherForecast({city: cityName, units: currentUnits}));
    }
    const handleWeatherForecast = () => {
      setDetail(!detail)
      dispatch(fetch5DayWeatherForecast({city: cityName, units: units}));
    }
    const handleSearch = e => {
      if(e.key === 'Enter') {
        dispatch(fetchWeatherInfo({city: cityName, units: units}));
        dispatch(fetch5DayWeatherForecast({city: cityName, units: units}));
      }
    }
    
    const selectThema = () => {
      let output = ''
      if(detail){
        output = 'detail'
      } else if(weather[0] && (weather[0].main === 'Clear' || weather[0].main === 'Clouds')) {
        output = 'sunny'
      } else {
        output = 'rainy'
      }
      return output;
    }
    const thema = selectThema();
    const renderWeatherForecast = (item, index) => {
      if(index<8){
      const event = new Date(item.dt_txt);
      const iconurl = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
      const temp = Math.round(item.main.temp);
      const time = `${event.getHours()}:00`;
      return (<div key={item.dt_txt} className='item'>
        <div className='temp'>
        <div>{temp}</div>
        <div className='dot' />
        </div>
      <div><img width={40} src={iconurl} alt="weathe icon"/></div>
        <div className='windSpeed'>{item.wind.speed}km/h</div>
        <div className='time'>{time}</div>
      </div>)
      }
    }
    const iconUrl = weather[0] &&  "http://openweathermap.org/img/w/" + weather[0].icon + ".png";
    return(
    <div className='weatherContainer'>
        <div className={thema}>
          <div className='switchHolder'>
            <Switch onChange={handleUnits} checked={units === 'metric' && true} />
          </div>
        <div className='weatherInfo'>
          <div className='searchHolder'>
              <input placeholder='city' onChange={handleOnChange} onKeyDown={handleSearch} className='city' value={cityName} />
          </div>
          {errorMessage && <div>Sorry we don't have weather info for that city.</div>}
            <div className='temp'>
              <div>
                {main.temp && Math.round(main.temp)}
              </div>
              <div className='tempInfo'>
                {units === 'metric' ? <span>&#8451;</span> : <span>&#8457;</span>}
                <img width={50} className='weatherIcon' src={iconUrl} alt='search' />
              </div>
            </div>
            <div className='discription'>
              {weather[0] && weather[0].main}
            </div>
            <button onClick={handleWeatherForecast} className='moreDetails'>
              {detail ? 'Detail v': 'More details >'}
            </button>
        </div>
          {!detail && <div className='imgHolder'>
            <img className='bigSun' alt='search'  />
          </div>}
          {detail && 
          <div className='forecastHolder'>
            <div className='detailInfo'>
              <div className='item'> 
                <div>N</div>
                {wind.speed} km/h
              </div>
              <div className='item'>
                <div>N</div>
                {main.pressure} km/h
              </div>
              </div>
              <div className='detailInfo'>
              <div className='item'>
                <div>N</div>
                {clouds.all} km/h
              </div>
              <div className='item'>
                <div>N</div>
                {main.humidity} km/h
              </div>
              </div>
            <div>24 hours forecast</div>
            <div className='forecast'>
            {weatherForecast && weatherForecast.list.map(renderWeatherForecast)}
            </div>
          </div>}
        </div>
      </div>

    )
}
export default DailyWeather;