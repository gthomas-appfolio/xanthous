import React from 'react';
import PropTypes from 'prop-types';
import addMinutes from 'date-fns/add_minutes';
import addSeconds from 'date-fns/add_seconds';
import fecha from 'fecha';
import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';
import isBefore from 'date-fns/is_before';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import startOfToday from 'date-fns/start_of_today';
import startOfTomorrow from 'date-fns/start_of_tomorrow';

import flow from 'lodash.flow';
import toLower from 'lodash.tolower';

import memoizeOne from 'memoize-one';

import Icon from './Icon';
import Select from './Select';

const format = fecha.format;
const parse = fecha.parse;

const INVALID_DATE = new Date(undefined);

// TODO consider using <input type="time" /> when better browser support.

// TODO use date-fns/parse to handle this behavior instead
function addMissingColons(str) {
  // looks for the hour in a smarter way than fecha - the first capture group only
  // captures 0 or 1 if it is followed by 3 digits with an optional colon
  const regex = /^((?:0|1(?=\d:?\d{2}))?\d)?(:?)(.*)$/;

  // eslint-disable-next-line no-unused-vars
  const [_fullStr, hour, _colon, restOfStr] = regex.exec(str);

  return [hour, ':', restOfStr].join('');
}

function normalizeTime(date) {
  let time = startOfToday();
  time = setHours(time, getHours(date));
  time = setMinutes(time, getMinutes(date));

  return time;
}

function getEndTime(end, timeFormat) {
  return end ? addSeconds(normalizeTime(parse(end, timeFormat)), 1) : startOfTomorrow();
}

function getStartTime(start, timeFormat) {
  return start ? normalizeTime(parse(start, timeFormat)) : startOfToday();
}

function onInterval(time, interval) {
  return getMinutes(time) % interval === 0;
}

/** Helper for userInputProgress(). Builds a regex for parsing a time in h:mm format
 * @param isTwoDigit whether the time to parse is a two digit (eg. 10:00) or
 * one digit (eg. 1:00) hour
 * @returns regex used to parse a string
*/
function buildhmmARegex(isTwoDigit) {
  const oneDigitHourAndColon = '\\d:?';
  const twoDigitHourAndColon = '\\d\\d:?';
  const hour = isTwoDigit ? twoDigitHourAndColon : oneDigitHourAndColon;
  const m0 = '\\d';
  const m1 = '\\d';

  return new RegExp(`^(?:${hour})?(${m0})?(${m1})?`);
}

/** Helper for userInputProgress(). Returns whether a time is two digits in h:mm
 * format, ie. if a time is one of 12am, 10am, 11am, 12am, 10pm, 11pm
*/
function isTwoDigitHour(time) {
  return [0, 10, 11, 12, 22, 23].includes(getHours(time));
}

/** filterOption() helper for determining user input progress
 * @returns [hasTypedTens, hasTypedMin] where:
 * - hasTypedTens === true if finished typing tens place in minute (5 in 8:53)
 * - hasTypedMin === true if finished typing minute (3 in 8:53)
 */
function userInputProgress(input, time) {
  const re = buildhmmARegex(isTwoDigitHour(time));
  const [, hasTypedTens, hasTypedMin] = re.exec(input);
  return [!!hasTypedTens, !!hasTypedMin];
}

export default class TimeInput extends React.Component {
  static propTypes = {
    ...Select.propTypes,
    className: PropTypes.string,
    /** Allow entering times outside of step interval */
    allowOtherTimes: PropTypes.bool,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    max: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    min: PropTypes.string,
    noResultsText: PropTypes.string,
    step: PropTypes.number, // TODO? 1-60
    timeFormat: PropTypes.string,
    value: PropTypes.string
  }

  static defaultProps = {
    allowOtherTimes: false,
    onChange: () => {},
    step: 30,
    placeholder: 'Enter a time',
    timeFormat: 'h:mm A',
    noResultsText: 'Must be in the format HH:MM AM/PM'
  }

  constructor(props) {
    super(props);
    const { defaultValue } = this.props;
    this.state = {
      selectedOption: defaultValue && this.valueStrToOption(defaultValue)
    };
  }

  valueFormat = 'HH:mm';

  valueStrToOption(valueStr) {
    return this.times().find(({ value }) => value === valueStr);
  }

  focus() {
    // TODO JavaScript does not allow opening selects programmatically.
    this.inputEl.focus();
  }

  defaultVisibleTimes() {
    const { step, timeFormat, min, max } = this.props;
    return this.visibleTimes(step, timeFormat, min, max);
  }

  allTimes() {
    const { timeFormat, min, max } = this.props;
    return this.visibleTimes(1, timeFormat, min, max);
  }

  times() {
    const { allowOtherTimes } = this.props;
    return allowOtherTimes ? this.allTimes() : this.defaultVisibleTimes();
  }

  // TODO replace with useMemo in react 16.7
  visibleTimes = memoizeOne((step, timeFormat, start, end) => {
    const times = [];
    let time = getStartTime(start, this.valueFormat);
    const max = getEndTime(end, this.valueFormat);

    do {
      times.push({
        label: format(time, timeFormat),
        value: format(time, this.valueFormat),
        time
      });
      time = addMinutes(time, step);
    } while (isBefore(time, max));

    return times;
  });

  onChange = (selectedOption) => {
    this.setState({ selectedOption });

    const value = selectedOption ? selectedOption.value : '';
    const time = normalizeTime(parse(value, this.valueFormat) || INVALID_DATE);
    this.props.onChange(value, time);
  }

  parseInput(input) {
    const str = addMissingColons(input);
    return parse(str, this.props.timeFormat);
  }

  // workaround for removing the "Create option..." text that appears when creating a new option
  promptTextCreator = string => string;

  isBeforeMax = time => isBefore(time, parse(this.props.max, this.valueFormat));

  isAfterMin = time => !isBefore(time, parse(this.props.min, this.valueFormat));

  isValidNewOption = ({ label }) => {
    const time = this.parseInput(label);
    const value = time ? format(time, this.valueFormat) : '';
    return !!(
      value &&
      (!this.props.min || this.isAfterMin(time)) &&
      (!this.props.max || this.isBeforeMax(time))
    );
  };

  isOptionUnique = ({ options, option: { value } }) => !options.some(option => option.value === value);

  newOptionCreator = ({ label }) => {
    const time = this.parseInput(label);
    return this.timeToOption(time);
  }

  /** Determines whether to display the current option given a particular user
   * input.
   * Handles the following user input cases:
   * - missing colons "930 AM"
   * - leading zeroes "09:30 AM"
   * - missing whitespace "9:30AM"
   * - typing am/pm upper or lower case "9:30 am"
  */
  filterOption = ({ label, time }, input) => {
    const { step } = this.props;

    const removeWhitespace = str => str.replace(/\s/gi, '');
    const removeLeadingZeros = str => str.replace(/^0*/, '');

    const inputCandidate = flow(removeWhitespace, removeLeadingZeros, toLower)(input);

    const [hasTypedTens, hasTypedMin] = userInputProgress(inputCandidate, time);

    // only show times on step if we havent started to type minutes
    if (!hasTypedTens && !onInterval(time, step)) return false;

    // only show times on step or on 10 min intervals if we havent finished typing minutes
    if (!hasTypedMin && !onInterval(time, step) && !onInterval(time, 10)) return false;

    const labelCandidate = flow(
      // Remove colon from option if input doesnt have one
      str => inputCandidate.includes(':') ? str : str.replace(/:/gi, ''),
      removeWhitespace,
      removeLeadingZeros,
      toLower
    )(label);

    return labelCandidate.indexOf(inputCandidate) === 0;
  };

  selectedOption() {
    return this.props.value ?
      this.valueStrToOption(this.props.value) :
      this.state.selectedOption;
  }

  render() {
    const {
      allowOtherTimes,
      disabled,
      max,
      min,
      onChange,
      placeholder,
      step,
      timeFormat,
      ...props
    } = this.props;

    const times = this.times();

    const creatableProps = {
      createOptionPosition: 'first',
      promptTextCreator: this.promptTextCreator,
      newOptionCreator: this.newOptionCreator,
      isValidNewOption: this.isValidNewOption,
      isOptionUnique: this.isOptionUnique
    };

    return (
      <Select
        {...props}
        arrowRenderer={() => <Icon name="clock-o" />}
        creatable={allowOtherTimes}
        {...(allowOtherTimes && creatableProps)}
        disabled={disabled}
        filterOption={this.filterOption}
        noResultsText={this.props.noResultsText}
        options={times}
        onChange={this.onChange}
        placeholder={placeholder}
        value={this.selectedOption()}
      />
    );
  }
}
