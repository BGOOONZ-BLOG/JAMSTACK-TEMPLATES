import * as React from 'react';
import {Datepicker} from 'baseui/datepicker';

export default function Scenario() {
  const [date, setDate] = React.useState(new Date('2020/01/01'));
  return (
    <Datepicker
      aria-label="Select a date"
      value={date}
      onChange={({date}) => setDate(date as Date)}
      formatString="d.M.yyyy"
      placeholder="dd.mm.yyyy"
      mask={null}
    />
  );
}
