import React from "react"
import { useTheme } from "@material-ui/core/styles"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts"

import * as moment from "moment"

import Title from "./Title"


const transformRow = (row) => {
  return {
    name: moment(row.timestamp).format("h:mm"),
    temperature: row.temperature,
  }
}

export default function TemperatureChart({ rows }) {
  const theme = useTheme()

  const data = rows.map(row => transformRow(row))

  return (
    <React.Fragment>
      <Title>Fridge Condition</Title>
      <ResponsiveContainer height={130}>
        <AreaChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="name">
            <Label value="Time" offset={0} position="insideBottom" />
          </XAxis>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Temperature (Celsius)
            </Label>
          </YAxis>
          <Area
            type="monotone"
            dataKey="temperature"
            stroke={theme.palette.primary.main}
            fill={theme.palette.primary.main}
          />
        </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
  )
}
