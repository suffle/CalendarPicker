/* eslint-env jasmine */
import 'react-native';
import React from 'react';
import CalendarPicker from '../CalendarPicker';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <CalendarPicker />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('CalendarPicker', function() {
  it('does not change current selected date on month change', function() {
    var currentDate = new Date(),
      calPicker = <CalendarPicker selectedDate={currentDate}/>;

    expect(calPicker).toBe(currentDate);
  });

  it('does not change current selected date on year change', function() {
    var currentDate = new Date(),
      calPicker = <CalendarPicker selectedDate={currentDate}/>;

    expect(calPicker).toBe(currentDate);
  });
});

describe('HeaderControls', function() {
  it('works', function() {
    expect(1).toBe(1);
  });
});

describe('WeekDaysLabels', function() {
  it('works', function() {
    expect(1).toBe(1);
  });
});

describe('Days', function() {
  it('works', function() {
    expect(1).toBe(1);
  });
});

describe('Day', function() {
  it('works', function() {
    expect(1).toBe(1);
  });
});
