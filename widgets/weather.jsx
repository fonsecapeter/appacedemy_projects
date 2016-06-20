const React = require('react');

const Weather = React.createClass({
  getInitialState () {
    return ({
      weather: ""
    });
  },

  render () {
    return (<p>{this.state.weather}</p>);
  },

  getWeatherByLocation (lon, lat) {
    let xmlhttp = new XMLHttpRequest ();
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === XMLHttpRequest.DONE ) {
           if (xmlhttp.status === 200) {
              this.setState ({
                weather: xmlhttp.response
              });
           } else if (xmlhttp.status === 400) {
              alert('There was an error 400');
           } else {
               alert('something else other than 200 was returned');
           }
        }
    };
    let url = `http://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=bcb83c4b54aee8418983c2aff3073b3b`;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  },

  componentDidMount () {
    navigator.geolocation.getCurrentPosition((pos) => {
      let position = {"lon":pos.coords.longitude, "lat":pos.coords.latitude};
      this.getWeatherByLocation(position.lon, position.lat);
    });
  }
});



module.exports = Weather;
