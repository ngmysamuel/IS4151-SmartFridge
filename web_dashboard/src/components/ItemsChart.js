import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from 'recharts';

import * as moment from "moment"


const transformRow = (row) => {
  return {
    name: moment(row.timestamp).format("h:mm"),
    apple: row.apple,
    banana: row.banana,
    broccoli: row.broccoli,
    cake: row.cake,
    carrot: row.carrot,
    donut: row.donut,
    hot_dog: row.hot_dog,
    // id: 7,
    orange: row.orange,
    pizza: row.pizza,
    sandwich: row.sandwich,
  }
}


export default class ItemsChart extends React.Component {
  render() {
    const { rows } = this.props

    const data = rows.map(row => transformRow(row))

    return (
      <ResponsiveContainer width={900} height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label value="Time" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle" }}
            >
              Quantity
            </Label>
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Line type="monotone" dataKey="banana" stroke="#ffff66" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="apple" stroke="#ff0000" />
          <Line type="monotone" dataKey="sandwich" stroke="#4dffff" />
          <Line type="monotone" dataKey="orange" stroke="#ff9900" />
          <Line type="monotone" dataKey="broccoli" stroke="#33cc33" />
          <Line type="monotone" dataKey="carrot" stroke="#e67300" />
          <Line type="monotone" dataKey="hot_dog" stroke="#cccc00" />
          <Line type="monotone" dataKey="pizza" stroke="#ff0066" />
          <Line type="monotone" dataKey="donut" stroke="#ff00ff" />
          <Line type="monotone" dataKey="cake" stroke="#333300" />
        </LineChart>
      </ResponsiveContainer>

    );
  }
}
