import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
const data = [];

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props,
    };
  }

  createData = () => {
    console.log(this.state);
    for (let i = 0; i < 3; i++) {
      data.push({
        name: this.state.items.items[i].dt_txt,
        temp: this.state.items.items[i].main.temp,
      });
    }
  };

  render() {
    this.createData();
    const renderLineChart = (
      <LineChart
        width={1200}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    );
    return <div>{renderLineChart}</div>;
  }
}
