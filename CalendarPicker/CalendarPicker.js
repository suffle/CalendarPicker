/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */
'use strict';

import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

var {
  WEEKDAYS,
  MONTHS,
  MAX_ROWS,
  MAX_COLUMNS,
  getDaysInMonth
} = require('./Util');

var makeStyles = require('./makeStyles');

//The styles in makeStyles are intially scaled to this width
const IPHONE6_WIDTH = 375;
var initialScale = Dimensions.get('window').width / IPHONE6_WIDTH ;
var styles = StyleSheet.create(makeStyles(initialScale));

var Day = React.createClass({
  propTypes: {
    date: React.PropTypes.instanceOf(Date),
    onDayChange: React.PropTypes.func,
    maxDate: React.PropTypes.instanceOf(Date),
    minDate: React.PropTypes.instanceOf(Date),
    selected: React.PropTypes.bool,
    day: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]).isRequired,
    screenWidth: React.PropTypes.number,
    startFromMonday: React.PropTypes.bool,
    selectedDayColor: React.PropTypes.string,
    selectedDayTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style
  },
  getDefaultProps () {
    return {
      onDayChange () {}
    };
  },

  getInitialState () {
    this.DAY_WIDTH = (this.props.screenWidth - 16)/7;
    this.SELECTED_DAY_WIDTH = (this.props.screenWidth - 16)/7 - 10;
    this.BORDER_RADIUS = this.SELECTED_DAY_WIDTH/2;
    return null;
  },

  changeDay() {
    this.props.onDayChange(this.props.day)
  },

  render() {
    var textStyle = this.props.textStyle;
    if (this.props.selected) {
      var selectedDayColorStyle = this.props.selectedDayColor ? {backgroundColor: this.props.selectedDayColor} : {};
      var selectedDayTextColorStyle = this.props.selectedDayTextColor ? {color: this.props.selectedDayTextColor} : {};
      return (
        <View style={styles.dayWrapper}>
          <View style={[styles.dayButtonSelected, selectedDayColorStyle]}>
            <TouchableOpacity
              style={styles.dayButton}
              onPress={this.changeDay}>
              <Text style={[styles.dayLabel, textStyle, selectedDayTextColorStyle]}>
                {this.props.day}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      if (this.props.date < this.props.minDate || this.props.date > this.props.maxDate) {
        return (
          <View style={styles.dayWrapper}>
            <Text style={[styles.dayLabel, textStyle, styles.disabledTextColor]}>
              {this.props.day}
            </Text>
          </View>
        );
      }
      else {
        return (
          <View style={styles.dayWrapper}>
            <TouchableOpacity
            style={styles.dayButton}
            onPress={this.changeDay}>
              <Text style={[styles.dayLabel, textStyle]}>
                {this.props.day}
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
  }
});

var Days = React.createClass({
  propTypes: {
    maxDate: React.PropTypes.instanceOf(Date),
    minDate: React.PropTypes.instanceOf(Date),
    date: React.PropTypes.instanceOf(Date).isRequired,
    day: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
    year: React.PropTypes.number.isRequired,
    onDayChange: React.PropTypes.func.isRequired,
    selectedDayColor: React.PropTypes.string,
    selectedDayTextColor: React.PropTypes.string,
    textStyle: Text.propTypes.style
  },

  onPressDay(day) {
    this.props.onDayChange({day: day});
  },

  // Not going to touch this one - I'd look at whether there is a more functional
  // way you can do this using something like `range`, `map`, `partition` and such
  // (see underscore.js), or just break it up into steps: first generate the array for
  // data, then map that into the components
  getCalendarDays() {
    var columns,
      matrix = [],
      i,
      j,
      month = this.props.month,
      year = this.props.year,
      currentDay = 0,
      thisMonthFirstDay = this.props.startFromMonday ? new Date(year, month, 0) : new Date(year, month, 1),
      slotsAccumulator = 0,
      selectedDay = this.props.date.getDate(),
      isSelectedMonth = month === this.props.date.getMonth(),
      isSelectedYear = year === this.props.date.getFullYear(),
      daysInMonth = getDaysInMonth(month, year),
      monthFirstDay = thisMonthFirstDay.getDay();

    for (i = 0; i < MAX_ROWS; i++ ) { // Week rows
      columns = [];

      for (j = 0; j < MAX_COLUMNS; j++) { // Day columns
        if (slotsAccumulator >= monthFirstDay) {
          if (currentDay < daysInMonth) {
            columns.push(<Day
                      key={j}
                      day={currentDay + 1}
                      selected={currentDay + 1 === selectedDay && isSelectedMonth && isSelectedYear}
                      date={new Date(year, month, currentDay + 1)}
                      maxDate={this.props.maxDate}
                      minDate={this.props.minDate}
                      onDayChange={this.onPressDay}
                      screenWidth={this.props.screenWidth}
                      selectedDayColor={this.props.selectedDayColor}
                      selectedDayTextColor={this.props.selectedDayTextColor}
                      textStyle={this.props.textStyle} />);
            currentDay++;
          }
        } else {
          columns.push(<Day
                            key={j}
                            day={''}
                            screenWidth={this.props.screenWidth}/>);
        }

        slotsAccumulator++;
      }
      matrix[i] = [];
      matrix[i].push(<View style={styles.weekRow}>{columns}</View>);
    }

    return matrix;
  },

  render() {
    return <View style={styles.daysWrapper}>{ this.getCalendarDays() }</View>;
  }

});

var WeekDaysLabels = React.createClass({
  propTypes: {
    screenWidth: React.PropTypes.number,
    textStyle: Text.propTypes.style
  },
  getInitialState() {
    this.DAY_WIDTH = (this.props.screenWidth - 16)/7;
    return null;
  },
  render() {
    return (
      <View style={styles.dayLabelsWrapper}>
        { (this.props.weekdays || WEEKDAYS).map((day, key) => { return <Text key={key} style={[styles.dayLabels, this.props.textStyle]}>{day}</Text>; }) }
      </View>
    );
  }
});

var HeaderControls = React.createClass({
  propTypes: {
    month: React.PropTypes.number.isRequired,
    year: React.PropTypes.number,
    getNextYear: React.PropTypes.func.isRequired,
    getPrevYear: React.PropTypes.func.isRequired,
    onMonthChange: React.PropTypes.func.isRequired,
    textStyle: Text.propTypes.style
  },
  getInitialState() {
    return {
      selectedMonth: this.props.month
    };
  },

  // Trigger date change if new props are provided.
  // Typically, when selectedDate is changed programmatically.
  //
  componentWillReceiveProps: function(newProps) {
    this.setState({
      selectedMonth: newProps.month
    });
  },

  // Logic seems a bit awkawardly split up between here and the CalendarPicker
  // component, eg: getNextYear is actually modifying the state of the parent,
  // could just let header controls hold all of the logic and have CalendarPicker
  // `onChange` callback fire and update itself on each change
  getNext() {
    var next = this.state.selectedMonth + 1;
    if (next > 11) {
      this.setState( { selectedMonth: 0 },
        // Run this function as a callback to ensure state is set first
        () => {
          this.props.getNextYear();
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    } else {
      this.setState({ selectedMonth: next },
        () => {
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    }
  },

  getPrevious() {
    var prev = this.state.selectedMonth - 1;
    if (prev < 0) {
      this.setState({ selectedMonth: 11},
        // Run this function as a callback to ensure state is set first
        () => {
          this.props.getPrevYear();
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    } else {
      this.setState({ selectedMonth: prev },
        () => {
          this.props.onMonthChange(this.state.selectedMonth);
        }
      );
    }
  },

  previousMonthDisabled() {
    return ( this.props.minDate &&
             ( this.props.year < this.props.minDate.getFullYear() ||
               ( this.props.year == this.props.minDate.getFullYear() && this.state.selectedMonth <= this.props.minDate.getMonth() )
             )
           );
  },

  nextMonthDisabled() {
    return ( this.props.maxDate &&
             ( this.props.year > this.props.maxDate.getFullYear() ||
               ( this.props.year == this.props.maxDate.getFullYear() && this.state.selectedMonth >= this.props.maxDate.getMonth() )
             )
           );
  },

  render() {
    var textStyle = this.props.textStyle;

    var previous;
    if ( this.previousMonthDisabled() ) {
      previous = (
        <Text style={[styles.prev, textStyle, styles.disabledTextColor]}>{this.props.previousTitle || 'Previous'}</Text>
      );
    }
    else {
      previous = (
        <TouchableOpacity onPress={this.getPrevious}>
          <Text style={[styles.prev, textStyle]}>{this.props.previousTitle || 'Previous'}</Text>
        </TouchableOpacity>
      );
    }

    var next;
    if ( this.nextMonthDisabled() ) {
      next = (
        <Text style={[styles.next, textStyle, styles.disabledTextColor]}>{this.props.nextTitle || 'Next'}</Text>
      );
    }
    else {
      next = (
        <TouchableOpacity onPress={this.getNext}>
          <Text style={[styles.next, textStyle]}>{this.props.nextTitle || 'Next'}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.headerWrapper}>
        <View style={styles.monthSelector}>
          {previous}
        </View>
        <View>
          <Text style={[styles.monthLabel, textStyle]}>
            { (this.props.months || MONTHS)[this.state.selectedMonth] } { this.props.year }
          </Text>
        </View>
        <View style={styles.monthSelector}>
          {next}
        </View>

      </View>
    );
  }
});

var CalendarPicker = React.createClass({
  propTypes: {
    maxDate: React.PropTypes.instanceOf(Date),
    minDate: React.PropTypes.instanceOf(Date),
    selectedDate: React.PropTypes.instanceOf(Date).isRequired,
    onDateChange: React.PropTypes.func,
    screenWidth: React.PropTypes.number,
    startFromMonday: React.PropTypes.bool,
    weekdays: React.PropTypes.array,
    months: React.PropTypes.array,
    previousTitle: React.PropTypes.string,
    nextTitle: React.PropTypes.string,
    selectedDayColor: React.PropTypes.string,
    selectedDayTextColor: React.PropTypes.string,
    scaleFactor: React.PropTypes.number,
    textStyle: Text.propTypes.style
  },
  getDefaultProps() {
    return {
      onDateChange () {}
    };
  },
  getInitialState() {
    if (this.props.scaleFactor !== undefined) {
      styles = StyleSheet.create(makeStyles(this.props.scaleFactor));
    }
    return {
      date: this.props.selectedDate,
      day: this.props.selectedDate.getDate(),
      month: this.props.selectedDate.getMonth(),
      year: this.props.selectedDate.getFullYear(),
      selectedDay: []
    };
  },

  // Trigger date change if new props are provided.
  // Typically, when selectedDate is changed programmatically.
  //
  componentWillReceiveProps: function(newProps) {
    this.setState({
      date:  newProps.selectedDate,
      day:   newProps.selectedDate.getDate(),
      month: newProps.selectedDate.getMonth(),
      year:  newProps.selectedDate.getFullYear()
    });
  },

  onDayChange(day) {
    this.setState({day: day.day}, () => { this.onDateChange(); });
  },

  onMonthChange(month) {
    this.setState({month: month});
  },

  getNextYear(){
    this.setState({year: this.state.year + 1});
  },

  getPrevYear() {
    this.setState({year: this.state.year - 1});
  },

  onDateChange() {
    var {
      day,
      month,
      year
    } = this.state,
      date = new Date(year, month, day);

    this.setState({date: date});
    this.props.onDateChange(date);
  },

  render() {
    return (
      <View style={[styles.calendar, this.props.style]}>
        <HeaderControls
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          year={this.state.year}
          month={this.state.month}
          onMonthChange={this.onMonthChange}
          getNextYear={this.getNextYear}
          getPrevYear={this.getPrevYear}
          months={this.props.months}
          previousTitle={this.props.previousTitle}
          nextTitle={this.props.nextTitle}
          textStyle={this.props.textStyle} />

        <WeekDaysLabels
          screenWidth={this.props.screenWidth}
          weekdays={this.props.weekdays}
          textStyle={this.props.textStyle} />

        <Days
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          day={this.state.day}
          month={this.state.month}
          year={this.state.year}
          date={this.state.date}
          onDayChange={this.onDayChange}
          screenWidth={this.props.screenWidth}
          startFromMonday={this.props.startFromMonday}
          selectedDayColor={this.props.selectedDayColor}
          selectedDayTextColor={this.props.selectedDayTextColor}
          textStyle={this.props.textStyle} />
      </View>
    );
  }
});

module.exports = CalendarPicker;
