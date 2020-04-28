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


class DateRangePicker extends React.Component {
  state = {
    pickTime: false,
  }

  handleSwitch = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  }

  render() {
    const {
      fromDate,
      toDate,
      handleFromDateChange,
      handleToDateChange
    } = this.props

    // console.log("DateRangePicker Props: ", this.props)
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <Grid item xs={12} md={6}>
            <KeyboardDatePicker
              margin="normal"
              id="from-date-picker-dialog"
              label="From Date"
              format="MM/dd/yyyy"
              value={fromDate}
              onChange={handleFromDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <KeyboardDatePicker
              margin="normal"
              id="to-date-picker-dialog"
              label="To Date"
              format="MM/dd/yyyy"
              value={toDate}
              onChange={handleToDateChange}
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
                  id="from-time-picker"
                  label="From Time"
                  value={fromDate}
                  onChange={handleFromDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardTimePicker
                  margin="normal"
                  id="to-time-picker"
                  label="To Time"
                  value={toDate}
                  onChange={handleToDateChange}
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
