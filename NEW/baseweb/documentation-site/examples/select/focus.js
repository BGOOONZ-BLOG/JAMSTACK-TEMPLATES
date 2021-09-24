// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Select} from 'baseui/select';
import {Button} from 'baseui/button';

export default function Example() {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState([]);
  const controlRef = React.useRef(null);
  return (
    <div className={css({display: 'flex'})}>
      <Select
        controlRef={controlRef}
        creatable
        options={[
          {id: 'Portland', label: 'Portland'},
          {id: 'NYC', label: 'New York City'},
          {id: 'LosAngeles', label: 'Los Angeles'},
          {id: 'Boston', label: 'Boston'},
          {id: 'Atlanta', label: 'Atlanta'},
          {id: 'SanFrancisco', label: 'San Francisco'},
        ]}
        labelKey="label"
        valueKey="id"
        onChange={({value}) => setValue(value)}
        value={value}
        overrides={{
          Root: {
            style: {
              marginRight: theme.sizing.scale600,
            },
          },
        }}
      />
      <Button
        onClick={() =>
          controlRef.current && controlRef.current.focus()
        }
      >
        Click to focus
      </Button>
    </div>
  );
}
