import React from 'react';
import { storiesOf, action } from '@storybook/react';

import addDays from 'date-fns/addDays';
import addWeeks from 'date-fns/addWeeks';
import addMonths from 'date-fns/addMonths';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import getWeek from 'date-fns/getWeek';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';

import InfoPanelDecorator, { monospace } from './InfoPanelDecorator';

import isInclusivelyAfterDay from '../src/utils/isInclusivelyAfterDay';
import CustomizableCalendarDay, { defaultStyles, selectedStyles } from '../src/components/CustomizableCalendarDay';

import { VERTICAL_ORIENTATION } from '../src/constants';

import DayPickerSingleDateControllerWrapper from '../examples/DayPickerSingleDateControllerWrapper';


const dayPickerSingleDateControllerInfo = `The ${monospace('DayPickerSingleDateController')} component is a
  fully controlled version of the ${monospace('DayPicker')} that has built-in rules for selecting a
  single date. Unlike the ${monospace('DayPicker')}, which requires the consumer to explicitly define
  ${monospace('onDayMouseEnter')}, ${monospace('onDayMouseLeave')}, and ${monospace('onDayClick')}
  handlers, the consumer needs simply to maintain the ${monospace('focused')} and
  ${monospace('date')} values in state and then pass these down as props along with
  ${monospace('onFocusChange')} and ${monospace('onDateChange')} callbacks that
  update them appropriately. You can see an example of this implementation <a href=
  "https://github.com/airbnb/react-dates/blob/master/examples/DayPickerSingleDateControllerWrapper.jsx">
  here</a>. <br/><br/>
  Note that the ${monospace('focused')} prop may be ${monospace('false')}, but if this is the
  case, dates are not selectable. As a result, in the example wrapper, we always force
  ${monospace('focused')} to be true in the ${monospace('onFocusChange')} method. <br/><br/>
  The ${monospace('DayPickerSingleDateController')} is particularly useful if you are interested in the
  ${monospace('SingleDatePicker')} functionality and calendar presentation, but would like to
  implement your own input.`;

const TestPrevIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Prev
  </span>
);

const TestNextIcon = () => (
  <span
    style={{
      border: '1px solid #dce0e0',
      backgroundColor: '#fff',
      color: '#484848',
      padding: '3px',
    }}
  >
    Next
  </span>
);

const TestCustomInfoPanel = () => (
  <div
    style={{
      padding: '10px 21px',
      borderTop: '1px solid #dce0e0',
      color: '#484848',
    }}
  >
    &#x2755; Some useful info here
  </div>
);

const datesList = [
  new Date(),
  addDays(new Date(), 1),
  addDays(new Date(), 3),
  addDays(new Date(), 9),
  addDays(new Date(), 10),
  addDays(new Date(), 11),
  addDays(new Date(), 13),
];

storiesOf('DayPickerSingleDateController', module)
  .addDecorator(InfoPanelDecorator(dayPickerSingleDateControllerInfo))
  .add('default', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
    />
  ))
  .add('with custom input', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      showInput
    />
  ))
  .add('non-english locale', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      monthFormat="yyyy[年]MMMM"
      locale="zh-CN"
    />
  ))
  .add('non-english locale #2', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      locale="pt-BR"
    />
  ))
  .add('single month', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={1}
    />
  ))
  .add('single month, custom caption', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={1}
      renderMonthElement={({ month, onMonthSelect, onYearSelect }) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <select
              value={getMonth(month)}
              onChange={(e) => { onMonthSelect(month, e.target.value); }}
            >
              {getMonth(new Date()).map((label, value) => (
                <option value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={getYear(month)}
              onChange={(e) => { onYearSelect(month, e.target.value); }}
            >
              <option value={getYear(new Date()) - 1}>Last year</option>
              <option value={getYear(new Date())}>{getYear(new Date())}</option>
              <option value={getYear(new Date()) + 1}>Next year</option>
            </select>
          </div>
        </div>
      )}
    />
  ))
  .add('3 months', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={3}
    />
  ))
  .add('vertical', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      orientation={VERTICAL_ORIENTATION}
    />
  ))
  .add('with custom month navigation', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      navPrev={<TestPrevIcon />}
      navNext={<TestNextIcon />}
    />
  ))
  .add('with outside days enabled', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      numberOfMonths={1}
      enableOutsideDays
    />
  ))
  .add('with month specified on open', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      initialVisibleMonth={() => addMonths(new Date(), 10)}
    />
  ))
  .add('allows all days, including past days', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isOutsideRange={() => false}
    />
  ))
  .add('allows next two weeks only', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isOutsideRange={day => !isInclusivelyAfterDay(day, new Date())
        || isInclusivelyAfterDay(day, addWeeks(new Date(), 2))
      }
    />
  ))
  .add('with some blocked dates', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isDayBlocked={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .add('with some highlighted dates', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isDayHighlighted={day1 => datesList.some(day2 => isSameDay(day1, day2))}
    />
  ))
  .add('blocks fridays', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      isDayBlocked={day => getWeek(day) === 4}
    />
  ))
  .add('with custom daily details', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      renderDayContents={day => format(day, 'ddd')}
    />
  ))
  .add('with custom day styles', () => {
    const customDayStyles = {
      // extend and update styles with es6 spread operators
      defaultStyles: {
        ...defaultStyles,
        color: 'blue',
        hover: {
          ...defaultStyles.hover,
          color: 'blue',
        },
      },
    };
    return (
      <DayPickerSingleDateControllerWrapper
        onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
        onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
        onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
        renderCalendarDay={props => (
          <CustomizableCalendarDay
            {...props}
            {...customDayStyles}
          />
        )}
      />
    );
  })
  .add('with info panel', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      renderCalendarInfo={() => (
        <TestCustomInfoPanel />
      )}
    />
  ))
  .add('with no animation', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      transitionDuration={0}
    />
  ))
  .add('with vertical spacing applied', () => (
    <DayPickerSingleDateControllerWrapper
      onOutsideClick={action('DayPickerSingleDateController::onOutsideClick')}
      onPrevMonthClick={action('DayPickerSingleDateController::onPrevMonthClick')}
      onNextMonthClick={action('DayPickerSingleDateController::onNextMonthClick')}
      verticalBorderSpacing={16}
    />
  ));
