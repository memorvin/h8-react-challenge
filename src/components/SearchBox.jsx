import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment'

export default class SearchBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null
    }
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch = () => {
    let obj = {
      startDate: this.state.startDate._d.getDate(),
      startMonth: this.state.startDate._d.getMonth()+1,
      startYear: this.state.startDate._d.getFullYear(),
      endDate: this.state.endDate._d.getDate(),
      endMonth: this.state.endDate._d.getMonth()+1,
      endYear: this.state.endDate._d.getFullYear()
    }
    this.props.onSearch(obj);
    this.resetForm()    
  }

  resetForm = () => {
    this.setState({
      startDate: null,
      endDate: null,
      focusedInput: null
    })
  }

  render() {
    const boxStyle = {
      marginLeft: "auto",
      marginRight: "auto"
    }

    return (
      <div className="w-1/3 block flex-grow lg:flex lg:items-center my-6" style={boxStyle}>
        <div className="text-sm lg:flex-grow">
          <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onDatesChange={({ startDate, endDate }) => { this.setState({ startDate, endDate }) }}
            focusedInput={this.state.focusedInput}
            onFocusChange={(focusedInput) => { this.setState({ focusedInput })}}
            isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
          />
          <button
            className="hover:bg-white hover:border-blue-700 border hover:text-blue-700 bg-blue-700 text-white font-bold py-2 mx-2 px-4 rounded"
            onClick={this.handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    )
  }
}

SearchBox.propTypes = {
  onSearch: PropTypes.func
};