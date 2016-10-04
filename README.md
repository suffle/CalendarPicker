# react-native-calendar-picker
Calendar Picker Component for React Native [![Build Status](https://travis-ci.org/stephy/CalendarPicker.svg?branch=master)](https://travis-ci.org/stephy/CalendarPicker)


This is a Calendar Picker Component for React Native
![alt tag](https://raw.github.com/stephy/CalendarPicker/master/calendarPicker.gif)

To use the calendar you just need to:

	npm install react-native-calendar-picker

How to use it:
```js
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';

var CalendarPicker = require('react-native-calendar-picker'),
    CalendarPicker2;

CalendarPicker2 = React.createClass({
  getInitialState: function() {
    return {
      date: new Date(),
    };
  },

  onDateChange: function(date) {
    this.setState({ date: date });
  },

  render: function() {
    return (
      <View style={styles.container}>

        <CalendarPicker
          selectedDate={this.state.date}
          onDateChange={this.onDateChange}
          screenWidth={Dimensions.get('window').width}
          selectedBackgroundColor={'#5ce600'} />

        <Text style={styles.selectedDate}> Date: { this.state.date.toString() } </Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  selectedDate: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#000',
  }
});

```
## Example Using ES6 Syntax
```js
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';

class CalendarPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }

    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({ date: date });
  }

  render() {
    return (
      <View style={styles.container}>

      <CalendarPicker
          selectedDate={this.state.date}
          onDateChange={this.onDateChange}
          screenWidth={Dimensions.get('window').width}
          weekdays = {['Mon', 'Tue', 'Wed', 'Th', 'Fri', 'Sat', 'Sun']}
          months = {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}
          nextTitle={'Next'}
          previousTitle={'Previous'}
          startFromMonday={true}
          selectedDayColor={'#E12518'}
          textStyle={styles.calendarTextStyle}
          selectedDayTextColor={'#FFFFFF'}
                style={{}} />

        <Text style={styles.selectedDate}> Date: { this.state.date.toString() } </Text>
      </View>
    )
  }
}
```
## CalendarPicker props
| Prop | Type | Description |
:------------ |:---------------:| :-----|
| weekdays | array | List of week days. Eg. ['Mo', 'Tue', ...] Must be 7 days |
| months | array | List of months names. |
| startFromMonday | boolean | Default first day of week will be Sunday. You can set start of week from Monday. |
| previousTitle | string | Title of button for previous month. |
| nextTitle | string | Title of button for next month. |
| selectedDayColor | string | Color for selected day |
| textStyle | object | Style overall text. Change fontFamily, color, etc. |
| scaleFactor | float | Optional. Default scales to window width |
| minDate | Date | Optional. Specifies minimum date to be selected |
| maxDate | Date | Optional. Specifies maximum date to be selected |


# To Do:

- Add swipe gestures
- Add ability to select date range


# Suggestions?

Drop an email to alves@stephanimoroni.com

Open issues

Submit PRs.


# Special thanks

I would like to call out some contributors who have been helping with this project

- [edvinerikson](https://github.com/edvinerikson)
- [thomaswright](https://github.com/thomaswright)
- [brentvatne](https://github.com/brentvatne)
- [kesha-antonov](https://github.com/kesha-antonov)
- [jthestupidkid](https://github.com/jthestupidkid)
- [adamkrell](https://github.com/adamkrell)
- [joshuapinter](https://github.com/joshuapinter)
