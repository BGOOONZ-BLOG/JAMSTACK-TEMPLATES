import * as React from 'react';
import {
  PhoneInput,
  COUNTRIES,
  CountrySelectDropdown,
  StyledFlag,
} from 'baseui/phone-input';

function CustomFlag(props: any) {
  const {children, ...rest} = props;
  return <StyledFlag iso={props.$iso} {...rest} />;
}

export default function Example() {
  const [text, setText] = React.useState('');
  const [country, setCountry] = React.useState(COUNTRIES.US);
  return (
    <PhoneInput
      text={text}
      country={country}
      onTextChange={event => {
        setText(event.currentTarget.value);
      }}
      onCountryChange={(event: any) => {
        setCountry(event.option);
      }}
      overrides={{
        FlagContainer: {
          component: CustomFlag,
        },
        CountrySelect: {
          props: {
            overrides: {
              Dropdown: {
                component: CountrySelectDropdown,
              },
            },
          },
        },
      }}
    />
  );
}
