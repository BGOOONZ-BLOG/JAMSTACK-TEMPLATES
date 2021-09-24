// @flow
import React from 'react';
import {PinCode} from 'baseui/pin-code';

export default function Example() {
  const [values, setValues] = React.useState(['', '', '', '']);
  return (
    <PinCode
      values={values}
      onChange={({values}) => {
        setValues(values);
      }}
    />
  );
}
