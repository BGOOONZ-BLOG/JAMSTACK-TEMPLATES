import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Option} from '../select';
import {SIZE} from '../input';
import {Override} from '../overrides';
import {Locale} from '../locale';
import {any} from 'prop-types';

export interface STATE_CHANGE_TYPE {
  change: 'change';
  moveUp: 'moveUp';
  moveDown: 'moveDown';
  moveLeft: 'moveLeft';
  moveRight: 'moveRight';
  mouseOver: 'mouseOver';
  mouseLeave: 'mouseLeave';
}

export interface ORIENTATION {
  horizontal: 'horizontal';
  vertical: 'vertical';
}

export type onChange = (args: {date: Date | Date[]}) => any;
export type StateReducer = (
  stateType: STATE_CHANGE_TYPE[keyof STATE_CHANGE_TYPE],
  nextState: ContainerState,
  currentState: ContainerState,
) => ContainerState;

export interface ContainerState {
  value?: Date | Date[];
}
export interface StatefulContainerProps<T> {
  children?: (args: T) => React.ReactNode;
  initialState?: ContainerState;
  stateReducer?: StateReducer;
  onChange?: onChange;
  range?: boolean;
}
export class StatefulContainer extends React.Component<
  StatefulContainerProps<CalendarProps | DatepickerProps>,
  ContainerState
> {
  onChange(data: {date: Date | Date[]}): void;
  internalSetState(
    type: STATE_CHANGE_TYPE[keyof STATE_CHANGE_TYPE],
    changes: ContainerState,
  ): void;
}

export interface CalendarProps {
  autoFocusCalendar?: boolean;
  excludeDates?: Date[];
  quickSelect?: boolean;
  quickSelectOptions?: Array<{id: string; beginDate: Date; endDate?: Date}>;
  filterDate?: (day: Date) => boolean;
  highlightedDate?: Date;
  includeDates?: Date[];
  range?: boolean;
  // see https://github.com/date-fns/date-fns/blob/master/src/locale/index.js.flow
  locale?: any;
  maxDate?: Date;
  minDate?: Date;
  monthsShown?: number;
  onDayClick?: (args: {date: Date; event: Event}) => any;
  onDayMouseOver?: (args: {date: Date; event: Event}) => any;
  onDayMouseLeave?: (args: {date: Date; event: Event}) => any;
  onMonthChange?: (args: {date: Date}) => any;
  onYearChange?: (args: {date: Date}) => any;
  onChange?: onChange;
  orientation?: ORIENTATION[keyof ORIENTATION];
  overrides?: DatepickerOverrides<SharedStylePropsT>;
  peekNextMonth?: boolean;
  timeSelectStart?: boolean;
  timeSelectEnd?: boolean;
  trapTabbing?: boolean;
  value?: Date | Date[] | null;
}
export interface CalendarState {
  highlightedDate: Date;
  focused: boolean;
  date: Date;
  quickSelectId?: string;
}
export class Calendar extends React.Component<CalendarProps, CalendarState> {
  getSingleDate(value: Date | Date[]): Date | null;
  getDateInView(): Date;
  handleMonthChange(date: Date): void;
  handleYearChange(date: Date): void;
  changeMonth({date}: {date: Date}): void;
  changeYear({date}: {date: Date}): void;
  renderCalendarHeader(date: Date, order: number): React.ReactNode;
  onKeyDown(event: KeyboardEvent): void;
  handleArrowKey(key: string): void;
  focusCalendar(): void;
  blurCalendar(): void;
  handleTabbing(event: KeyboardEvent): void;
  onDayMouseOver(data: {event: Event; date: Date}): void;
  onDayMouseLeave(data: {event: Event; date: Date}): void;
  handleDateChange(data: {date: Date | Date[]}): void;
  handleTimeChange(time: Date, index: number): void;
  setHighlightedDate(date: Date): void;
  renderMonths(): React.ReactNode[];
  renderTimeSelect(
    value: Date,
    onChange: (...args: any) => any,
  ): React.ReactNode;
  renderQuickSelect(): React.ReactNode;
}

export const StatefulCalendar: React.FC<StatefulDatepickerProps<CalendarProps>>;

export interface DatepickerOverrides<T> {
  Root?: Override<T>;
  QuickSelect?: Override<T>;
  QuickSelectContainer?: Override<T>;
  QuickSelectFormControl?: Override<T>;
  TimeSelect?: Override<T>;
  TimeSelectContainer?: Override<T>;
  TimeSelectFormControl?: Override<T>;
  CalendarContainer?: Override<T>;
  CalendarHeader?: Override<T>;
  PrevButton?: Override<T>;
  PrevButtonIcon?: Override<T>;
  NextButton?: Override<T>;
  NextButtonIcon?: Override<T>;
  MonthContainer?: Override<T>;
  MonthHeader?: Override<T>;
  MonthYearSelectButton?: Override<T>;
  MonthYearSelectIconContainer?: Override<T>;
  MonthYearSelectPopover?: Override<T>;
  MonthYearSelectStatefulMenu?: Override<T>;
  WeekdayHeader?: Override<T>;
  Month?: Override<T>;
  Week?: Override<T>;
  Day?: Override<T>;
  Input?: Override<T>;
  InputWrapper?: Override<T>;
  Popover?: Override<T>;
}
export type DatepickerProps = CalendarProps & {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  disabled?: boolean;
  clearable?: boolean;
  size?: SIZE[keyof SIZE];
  error?: boolean;
  positive?: boolean;
  placeholder?: string;
  required?: boolean;
  displayValueAtRangeIndex?: number;
  formatDisplayValue?: (date: Date | Date[], formatString: string) => string;
  formatString?: string;
  mask?: string | null;
  mountNode?: HTMLElement;
  onClose?: () => any;
};
export interface DatepickerState {
  calendarFocused: boolean;
  isOpen: boolean;
  isPseudoFocused: boolean;
  lastActiveElm?: HTMLElement;
}

declare function formatDate(
  date: Date | Date[],
  formatString: string,
): string | string[];

export {formatDate};

export class Datepicker extends React.Component<
  DatepickerProps,
  DatepickerState
> {
  onChange(data: {date: Date | Date[]}): void;
  formatDate(date: Date | Date[], formatString: string): string | string[];
  formatDisplayValue(date: Date | Date[]): string;
  open(): void;
  close(): void;
  handleEsc(): void;
  handleInputBlur(): void;
  handleKeyDown(event: KeyboardEvent): void;
  focusCalendar(): void;
}
export {Datepicker as DatePicker};

export type StatefulDatepickerProps<T> = T &
  StatefulContainerProps<T> & {children?: (args: T) => React.ReactNode};
export const StatefulDatepicker: React.FC<
  StatefulDatepickerProps<DatepickerProps>
>;

export {StatefulDatepicker as StatefulDatePicker};

export interface TimezonePickerProps {
  date?: Date;
  disabled?: boolean;
  positive?: boolean;
  error?: boolean;
  mapLabels?: (args: Option) => React.ReactNode;
  onChange?: (value: {id: string; label: string; offset: number}) => any;
  overrides?: {Select?: Override<any>};
  value?: string;
}
export interface TimezonePickerState {
  timezones: Option[];
  value?: string;
}
export class TimezonePicker extends React.Component<
  TimezonePickerProps,
  TimezonePickerState
> {
  buildTimezones(compareDate: Date): string[];
}

export const DISPLAY_FORMAT: 'L';
export const ISO_FORMAT: 'YYYY-MM-DD';
export const ISO_MONTH_FORMAT: 'YYYY-MM';

export const STATE_CHANGE_TYPE: STATE_CHANGE_TYPE;

export const ORIENTATION: ORIENTATION;

export const WEEKDAYS: [0, 1, 2, 3, 4, 5, 6];

export type SharedStylePropsT = {
  $date: Date;
  $disabled: boolean;
  $isHeader: boolean;
  $isHighlighted: boolean;
  $isHovered: boolean;
  $outsideMonth: boolean;
  $pseudoHighlighted: boolean;
  $pseudoSelected: boolean;
  $selected: boolean;
  $startDate: boolean;
  $range: boolean;
  $hasRangeHighlighted: boolean;
  $hasRangeOnRight: boolean;
  $hasRangeSelected: boolean;
};
