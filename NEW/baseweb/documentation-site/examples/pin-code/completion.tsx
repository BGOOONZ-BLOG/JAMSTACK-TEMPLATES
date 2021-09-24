import React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {PinCode} from 'baseui/pin-code';

export default function Example() {
  const [css] = useStyletron();
  const [values, setValues] = React.useState(['', '', '', '']);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  return (
    <div className={css({display: 'flex'})}>
      <PinCode
        values={values}
        onChange={({values}: any) => {
          setValues(values);
          // if all of our inputs are filled in,
          // shift focus to our submit button
          if (!values.includes('')) {
            buttonRef.current && buttonRef.current.focus();
          }
        }}
      />
      <Button ref={buttonRef}>Submit</Button>
    </div>
  );
}
