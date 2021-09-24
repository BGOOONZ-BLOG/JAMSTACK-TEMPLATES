/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {StyledDay} from './styled-components.js';
import dateFnsAdapter from './utils/date-fns-adapter.js';
import DateHelpers from './utils/date-helpers.js';
import {getOverrides} from '../helpers/overrides.js';
import type {DayPropsT, DayStateT} from './types.js';
import {LocaleContext} from '../locale/index.js';
import type {LocaleT} from '../locale/types.js';
import {isFocusVisible} from '../utils/focusVisible.js';

export default class Day<T = Date> extends React.Component<
  DayPropsT<T>,
  DayStateT,
> {
  static defaultProps = {
    disabled: false,
    highlighted: false,
    range: false,
    adapter: dateFnsAdapter,
    onClick: () => {},
    onSelect: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onMouseOver: () => {},
    onMouseLeave: () => {},
    overrides: {},
    peekNextMonth: true,
    value: null,
  };

  dayElm: React.ElementRef<*>;

  state = {
    isHovered: false,
    isFocusVisible: false,
  };

  dateHelpers: DateHelpers<T>;

  constructor(props: DayPropsT<T>) {
    super(props);
    this.dateHelpers = new DateHelpers(props.adapter);
  }

  componentDidMount() {
    if (this.dayElm && this.props.focusedCalendar) {
      if (
        this.props.highlighted ||
        (!this.props.highlightedDate && this.isSelected())
      ) {
        this.dayElm.focus();
      }
    }
  }

  componentDidUpdate(prevProps: DayPropsT<T>) {
    if (this.dayElm && this.props.focusedCalendar) {
      if (
        this.props.highlighted ||
        (!this.props.highlightedDate && this.isSelected())
      ) {
        this.dayElm.focus();
      }
    }
  }

  getDateProp: () => T = () => {
    return this.props.date === undefined
      ? this.dateHelpers.date()
      : this.props.date;
  };

  getMonthProp: () => number = () => {
    return this.props.month === undefined || this.props.month === null
      ? this.dateHelpers.getMonth(this.getDateProp())
      : this.props.month;
  };

  onSelect: T => void = selectedDate => {
    const {range, value} = this.props;
    let date;
    if (Array.isArray(value) && range) {
      if (!value.length || value.length > 1) {
        date = [selectedDate];
      } else if (this.dateHelpers.isAfter(selectedDate, value[0])) {
        date = [value[0], selectedDate];
      } else {
        date = [selectedDate, value[0]];
      }
    } else {
      date = selectedDate;
    }
    this.props.onSelect({date});
  };

  onKeyDown = (event: KeyboardEvent) => {
    const date = this.getDateProp();
    const {highlighted, disabled} = this.props;
    if (event.key === 'Enter' && highlighted && !disabled) {
      event.preventDefault();
      this.onSelect(date);
    }
  };

  onClick = (event: Event) => {
    const date = this.getDateProp();
    const {disabled} = this.props;
    if (!disabled) {
      this.props.onClick({event, date});
      this.onSelect(date);
    }
  };

  onFocus = (event: Event) => {
    if (isFocusVisible(event)) {
      this.setState({isFocusVisible: true});
    }
    this.props.onFocus({event, date: this.getDateProp()});
  };

  onBlur = (event: Event) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({isFocusVisible: false});
    }
    this.props.onBlur({event, date: this.getDateProp()});
  };

  onMouseOver = (event: Event) => {
    this.setState({isHovered: true});
    this.props.onMouseOver({event, date: this.getDateProp()});
  };

  onMouseLeave = (event: Event) => {
    this.setState({isHovered: false});
    this.props.onMouseLeave({event, date: this.getDateProp()});
  };

  isOutsideMonth = () => {
    const month = this.getMonthProp();
    return (
      month !== undefined &&
      month !== this.dateHelpers.getMonth(this.getDateProp())
    );
  };

  isSelected() {
    const date = this.getDateProp();
    const {value} = this.props;
    if (Array.isArray(value)) {
      return (
        this.dateHelpers.isSameDay(date, value[0]) ||
        this.dateHelpers.isSameDay(date, value[1])
      );
    } else {
      return this.dateHelpers.isSameDay(date, value);
    }
  }

  clampToDayStart: T => T = dt => {
    const {setSeconds, setMinutes, setHours} = this.dateHelpers;
    return setSeconds(setMinutes(setHours(dt, 0), 0), 0);
  };

  // calculated for range case only
  isPseudoSelected() {
    const date = this.getDateProp();
    const {value} = this.props;
    if (Array.isArray(value) && !value[0] && !value[1]) {
      return false;
    }
    // fix flow by passing a specific arg type and remove 'Array.isArray(value)'
    if (Array.isArray(value) && value.length > 1) {
      return this.dateHelpers.isDayInRange(
        this.clampToDayStart(date),
        this.clampToDayStart(value[0]),
        this.clampToDayStart(value[1]),
      );
    }
  }

  // calculated for range case only
  isPseudoHighlighted() {
    const date = this.getDateProp();
    const {value, highlightedDate} = this.props;
    if (Array.isArray(value) && !value[0] && !value[1]) {
      return false;
    }

    // fix flow by passing a specific arg type and remove 'Array.isArray(value)'
    if (Array.isArray(value) && highlightedDate && value[0] && !value[1]) {
      if (this.dateHelpers.isAfter(highlightedDate, value[0])) {
        return this.dateHelpers.isDayInRange(
          this.clampToDayStart(date),
          this.clampToDayStart(value[0]),
          this.clampToDayStart(highlightedDate),
        );
      } else {
        return this.dateHelpers.isDayInRange(
          this.clampToDayStart(date),
          this.clampToDayStart(highlightedDate),
          this.clampToDayStart(value[0]),
        );
      }
    }
  }

  getSharedProps() {
    const date = this.getDateProp();
    const {value, highlightedDate, range, highlighted} = this.props;
    const $isHighlighted = highlighted;
    const $selected = this.isSelected();
    const $hasRangeHighlighted = !!(
      Array.isArray(value) &&
      range &&
      value.length === 1 &&
      highlightedDate &&
      !this.dateHelpers.isSameDay(value[0], highlightedDate)
    );
    return {
      $date: date,
      $disabled: this.props.disabled,
      $endDate:
        (Array.isArray(value) &&
          this.props.range &&
          $selected &&
          this.dateHelpers.isSameDay(date, value[1])) ||
        false,
      $hasRangeHighlighted,
      $hasRangeOnRight:
        Array.isArray(value) &&
        $hasRangeHighlighted &&
        (highlightedDate && value[0]) &&
        this.dateHelpers.isAfter(highlightedDate, value[0]),
      $hasRangeSelected: Array.isArray(value) ? value.length === 2 : false,
      $highlightedDate: highlightedDate,
      $isHighlighted,
      $isHovered: this.state.isHovered,
      $isFocusVisible: this.state.isFocusVisible,
      $startOfMonth: this.dateHelpers.isStartOfMonth(date),
      $endOfMonth: this.dateHelpers.isEndOfMonth(date),
      $outsideMonth: this.isOutsideMonth(),
      $peekNextMonth: this.props.peekNextMonth,
      $pseudoHighlighted:
        this.props.range && !$isHighlighted && !$selected
          ? this.isPseudoHighlighted()
          : false,
      $pseudoSelected:
        this.props.range && !$selected ? this.isPseudoSelected() : false,
      $range: this.props.range,
      $selected,
      $startDate:
        Array.isArray(this.props.value) &&
        this.props.value.length > 1 &&
        this.props.range &&
        $selected
          ? this.dateHelpers.isSameDay(date, this.props.value[0])
          : false,
    };
  }

  getAriaLabel(
    sharedProps: {
      $disabled: boolean,
      $range: boolean,
      $selected: boolean,
      $startDate: boolean,
      $endDate: boolean,
    },
    localeContext: LocaleT,
  ) {
    const date = this.getDateProp();
    return `${
      sharedProps.$selected
        ? sharedProps.$range
          ? sharedProps.$endDate
            ? localeContext.datepicker.selectedEndDateLabel
            : localeContext.datepicker.selectedStartDateLabel
          : localeContext.datepicker.selectedLabel
        : sharedProps.$disabled
        ? localeContext.datepicker.dateNotAvailableLabel
        : localeContext.datepicker.chooseLabel
    } ${this.dateHelpers.format(date, 'fullOrdinalWeek', this.props.locale)}. ${
      !sharedProps.$disabled ? localeContext.datepicker.dateAvailableLabel : ''
    }`;
  }

  render() {
    const date = this.getDateProp();
    const {peekNextMonth, overrides = {}} = this.props;
    const sharedProps = this.getSharedProps();
    const [Day, dayProps] = getOverrides(overrides.Day, StyledDay);
    return !peekNextMonth && sharedProps.$outsideMonth ? (
      <Day
        role="gridcell"
        {...sharedProps}
        {...dayProps}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      />
    ) : (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <LocaleContext.Consumer>
        {(locale: LocaleT) => (
          <Day
            aria-label={this.getAriaLabel(sharedProps, locale)}
            ref={dayElm => {
              this.dayElm = dayElm;
            }}
            role="gridcell"
            aria-roledescription="button"
            tabIndex={
              this.props.highlighted ||
              (!this.props.highlightedDate && this.isSelected())
                ? 0
                : -1
            }
            {...sharedProps}
            {...dayProps}
            // Adding event handlers after customers overrides in order to
            // make sure the components functions as expected
            // We can extract the handlers from props overrides
            // and call it along with internal handlers by creating an inline handler
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onClick={this.onClick}
            onKeyDown={this.onKeyDown}
            onMouseOver={this.onMouseOver}
            onMouseLeave={this.onMouseLeave}
          >
            {this.dateHelpers.getDate(date)}
          </Day>
        )}
      </LocaleContext.Consumer>
    );
  }
}
