import React from 'react';
import {useStyletron} from 'baseui';
import {Grid, Cell} from 'baseui/layout-grid';

export default function Example() {
  return (
    <Outer>
      <Grid>
        <Cell span={2}>
          <Inner>1</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>2</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>3</Inner>
        </Cell>
        <Cell span={2}>
          <Inner>4</Inner>
        </Cell>
      </Grid>
    </Outer>
  );
}

const Outer: React.FunctionComponent<{}> = ({children}) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        background: theme.colors.accent100,
      })}
    >
      {children}
    </div>
  );
};

const Inner: React.FunctionComponent<{}> = ({children}) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: theme.colors.accent200,
        color: theme.colors.accent700,
        padding: '.25rem',
      })}
    >
      {children}
    </div>
  );
};
