import React, { Component } from 'react';
import { getCurrentLatLng } from '../../services/geolocation';
import { getCurWeatherByLatLng } from '../../services/weather-api';
import './App.css';
import Map from '../../components/Map/Map';



class App extends Component {

  state = {
    lat: null,
    lng: null,
    temp: null,
    icon: '',
  }

  async componentDidMount() {
    // destructure the object returned by getCurrentLatLng
    const { lat, lng } = await getCurrentLatLng();
    // console.log(lat, lng);
    const weatherData = await getCurWeatherByLatLng(lat, lng);

    this.setState({
      lat,
      lng,
      temp: Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon
    });
    // console.log(this.state)
    // console.log(Math.round(weatherData.main.temp))
  }

  render() {
    return (
      <div className='App'>
        <Map
          lat={this.state.lat}
          lng={this.state.lng} />
        <header className='App-header'>
          <div>{this.state.temp}&deg;</div>
          REACT WEATHER
          {this.state.icon &&
            <img
              src={`https://openweathermap.org/img/w/${this.state.icon}.png`}
              alt='Current Conditions'
            />
          }
        </header>
      </div>
    );
  }

}

export default App;
