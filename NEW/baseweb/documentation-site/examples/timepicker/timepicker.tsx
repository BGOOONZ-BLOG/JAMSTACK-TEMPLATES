import React, {useState} from 'react';
import {useStyletron} from 'baseui';
import {TimePicker} from 'baseui/timepicker';
import {FormControl} from 'baseui/form-control';

export default function Example() {
  const [css] = useStyletron();
  const [twelveHourTime, setTwelveHourTime] = useState<Date | null>(
    null,
  );
  const [
    twentyFourHourTime,
    setTwentyFourHourTime,
  ] = useState<Date | null>(null);
  const [creatableTime, setCreatableTime] = useState<Date | null>(
    null,
  );

  return (
    <div className={css({width: '130px'})}>
      <FormControl label="12 hour format">
        <TimePicker
          value={twelveHourTime}
          onChange={setTwelveHourTime}
        />
      </FormControl>
      <FormControl label="24 hour format">
        <TimePicker
          value={twentyFourHourTime}
          onChange={setTwentyFourHourTime}
          format="24"
          step={1800}
        />
      </FormControl>
      <FormControl label="Creatable times">
        <TimePicker
          value={creatableTime}
          onChange={setCreatableTime}
          creatable
          step={900}
        />
      </FormControl>
    </div>
  );
}
