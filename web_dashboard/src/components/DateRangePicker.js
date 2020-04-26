import React from "react"

import Grid from "@material-ui/core/Grid"
import FormGroup from "@material-ui/core/FormGroup"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"

import { format } from 'date-fns'

class DateRangePicker extends React.Component {
  state = {
    pickTime: false,
    // default fromDate is 00:00 AM of today
    fromDate: format(new Date().setHours(0,0,0,0), 'yyyy MMM dd HH:mm:ss'),
    // toDate must not be later than current time
    toDate: new Date(),
  }

  handleSwitch = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  }

  handleFromDateChange = date => {
    this.setState({
      fromDate: date
    })
  }

  handleToDateChange = date => {
    this.setState({
      toDate: date
    })
  }

  render() {
    console.log("state: ", this.state)

    console.log(this.state.toDate.setHours(20))
  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <Grid item xs={12} md={6}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={this.state.fromDate}
              onChange={this.handleFromDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={this.state.toDate}
              onChange={this.handleToDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.pickTime}
                    onChange={this.handleSwitch("pickTime")}
                    value="pickTime"
                    name="pickTime"
                  />
                }
                label="Select Time"
              />
            </FormGroup>
          </Grid>
          {this.state.pickTime &&
            <>
              <Grid item xs={12} md={6}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={this.state.fromDate}
                  onChange={this.handleFromDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  value={this.state.toDate}
                  onChange={this.handleToDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
            </>
          }
        </Grid>
      </MuiPickersUtilsProvider>
    )
  }
}

export default DateRangePicker
