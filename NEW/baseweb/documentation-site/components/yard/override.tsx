import * as React from 'react';
import {useStyletron} from 'baseui';
import {StatefulTooltip} from 'baseui/tooltip';
import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import Editor from './editor';
import {toggleOverrideSharedProps} from './ast';

import {formatCode} from 'react-view';

export const getHighlightStyles = (
  isLightTheme: boolean,
  sharedProps: string[],
) =>
  formatCode(`({ $theme, ${sharedProps.join(',')} }) => ({
    outline: \`\${${
      isLightTheme ? '$theme.colors.warning200' : '$theme.colors.warning600'
    }} solid\`,
    backgroundColor: ${
      isLightTheme ? '$theme.colors.warning200' : '$theme.colors.warning600'
    },
    })
  `);

const getEmptyStyles = (sharedProps: string[]) =>
  formatCode(`({ $theme, ${sharedProps.join(',')} }) => ({})
`);

type TProps = {
  overrideKey: string;
  overrides: any;
  overridesObj: any;
  componentConfig: any;
  componentName: string;
  set: (args: any) => void;
};

const SharedPropsTooltip: React.FC<{
  componentConfig: any;
  children: React.ReactNode;
}> = ({componentConfig, children}) => {
  const sharedProps = Object.keys(componentConfig.overrides.custom.sharedProps);
  const getDescription = (name: string) => {
    let metaObj: {type: string; description: string} | undefined;
    if (
      typeof componentConfig.overrides.custom.sharedProps[name] === 'string'
    ) {
      metaObj =
        componentConfig[componentConfig.overrides.custom.sharedProps[name]];
    } else {
      metaObj = componentConfig.overrides.custom.sharedProps[name];
    }
    if (metaObj) {
      return (
        <React.Fragment>
          <i>{metaObj.type}</i> - {metaObj.description}
        </React.Fragment>
      );
    } else {
      if (process.env.WEBSITE_ENV !== 'production') {
        console.warn(
          `Could not find a tooltip description for "${name}". Is this prop included in the yard configuration?`,
        );
      }
      return '-';
    }
  };
  return (
    <StatefulTooltip
      accessibilityType="tooltip"
      placement="bottomLeft"
      content={
        <React.Fragment>
          <p>These props are passed to the override function:</p>
          <ul>
            <li>
              <strong>$theme</strong>: <i>ThemeT</i> - Global theme object.
            </li>
            {sharedProps.map(prop => (
              <li key={prop}>
                <strong>{prop}</strong>: {getDescription(prop)}
              </li>
            ))}
          </ul>
        </React.Fragment>
      }
    >
      {children}
    </StatefulTooltip>
  );
};

const Override: React.FC<TProps> = ({
  overrideKey,
  overrides,
  overridesObj,
  componentConfig,
  set,
}) => {
  const [css, theme] = useStyletron();
  const isLightTheme = theme.name.startsWith('light-theme');
  const code = overridesObj[overrideKey] ? overridesObj[overrideKey].style : '';
  return (
    <div className={css({paddingRight: '10px', paddingBottom: '16px'})}>
      <Editor
        onChange={newCode => {
          set({
            ...overrides.value,
            [overrideKey]: {style: newCode, active: true},
          });
        }}
        code={code}
        small
      />
      <ButtonGroup
        size={SIZE.mini}
        overrides={{
          Root: {
            style: ({$theme}) => ({
              marginTop: $theme.sizing.scale300,
              [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
                flexWrap: 'wrap',
              },
            }),
          },
        }}
      >
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            set({
              ...overrides.value,
              [overrideKey]: {
                style: formatCode(overrides.value[overrideKey].style),
                active: true,
              },
            });
          }}
        >
          Format
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            const newCode = formatCode(
              toggleOverrideSharedProps(
                overrides.value[overrideKey].style,
                Object.keys(overrides.custom.sharedProps),
              ),
            );
            set({
              ...overrides.value,
              [overrideKey]: {
                style: newCode,
                active: true,
              },
            });
          }}
        >
          <SharedPropsTooltip componentConfig={componentConfig}>
            Toggle shared props
          </SharedPropsTooltip>
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            set({
              ...overrides.value,
              [overrideKey]: {
                style: getEmptyStyles([]),
                active: true,
              },
            });
          }}
        >
          Empty
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            set({
              ...overrides.value,
              [overrideKey]: {
                style: getHighlightStyles(isLightTheme, []),
                active: true,
              },
            });
          }}
        >
          Reset
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Override;
