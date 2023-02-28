import React from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import Graph from "./graph";

const OPEN_WEATHER_API_KEY = "628fdaca506ad0497d17e54adc7e5fb1";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInputValue: "",
      weatherData: "",
      error: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${this.state.cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => response.data[0])
      .then((newData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${newData.lat}&lon=${newData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((reply) => {
        const { data: weatherData } = reply;
        this.setState({
          weatherData: weatherData,
        });
      })
      .catch((err) => {
        this.setState({
          error: "Country does not exist",
        });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <form onSubmit={this.handleSubmit}>
            <input
              name="cityInputValue"
              type="text"
              value={this.state.cityInputValue}
              onChange={this.handleChange}
            ></input>
            <input name="submit" value="submit" type="submit"></input>
          </form>

          {this.state.error === "" ? (
            <div>
              <p> Today's weather forcase</p>
              <table>
                <tbody>
                  {this.state.weatherData !== ""
                    ? this.state.weatherData.list.map((list, index) =>
                        index < 3 ? (
                          <tr key={list.dt}>
                            <td>{list.dt_txt}</td>
                            <td>{list.weather[0].main}</td>
                          </tr>
                        ) : null
                      )
                    : null}
                </tbody>
              </table>
              {this.state.weatherData.list !== undefined ? (
                <Graph items={this.state.weatherData.list} />
              ) : null}
            </div>
          ) : (
            <div>{this.state.error}</div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
