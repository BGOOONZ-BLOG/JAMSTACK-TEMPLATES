import * as React from 'react';
import {StatelessAccordion as Accordion, Panel} from 'baseui/accordion';
import {useStyletron} from 'baseui';
import {TConfig} from './types';
import NestedTooltip from './nested-tooltip';

import Override, {getHighlightStyles} from './override';

type TOverridesProps = {
  set: any;
  overrides: any;
  componentConfig: any;
  componentName: string;
  isNested?: boolean;
};

const Overrides: React.FC<TOverridesProps> = ({
  overrides,
  set,
  componentName,
  componentConfig,
  isNested,
}) => {
  const [, theme] = useStyletron();
  const isLightTheme = theme.name.startsWith('light-theme');
  if (
    !overrides ||
    !overrides.custom ||
    !overrides.custom.names ||
    overrides.custom.names.length === 0
  ) {
    return null;
  }

  const overridesObj: {
    [key: string]: {
      style: any;
      nested?: TConfig;
      nestedValue?: any;
    };
  } = {};

  overrides.custom.names.forEach((key: string | TConfig) => {
    const stringKey = typeof key === 'string' ? key : key.componentName;
    if (overrides.value && overrides.value[stringKey]) {
      overridesObj[stringKey] = overrides.value[stringKey];
    } else {
      overridesObj[stringKey] = {
        style: null,
      };
    }
    overridesObj[stringKey]['nested'] =
      typeof key === 'string' ? undefined : key;
  });

  const getNewState = (expanded: (string | number)[]) => {
    const returnValue: any = {...overrides.value};
    if (overrides.value) {
      Object.keys(overrides.value).forEach(key => {
        returnValue[key]['active'] = false;
      });
    }
    expanded.forEach(key => {
      if (overridesObj[key].nestedValue || overridesObj[key].nested) {
        if (!returnValue[key]) {
          returnValue[key] = {
            style: undefined,
          };
        }
      } else if (overridesObj[key].style === null) {
        returnValue[key] = {
          style: getHighlightStyles(isLightTheme, []),
        };
      } else {
        returnValue[key] = {
          style: overridesObj[key].style,
        };
      }
      returnValue[key]['active'] = true;
    });
    return returnValue;
  };

  const handleChange = ({expanded}: {expanded: (string | number)[]}) => {
    const newState = getNewState(expanded);
    set(Object.keys(newState).length > 0 ? newState : undefined);
  };

  const expanded = Object.keys(overrides.value ? overrides.value : {})
    .map(key => {
      const override = overrides.value[key];
      if (override.active) {
        return key;
      } else {
        return null;
      }
    })
    .filter(val => !!val);

  return (
    <React.Fragment>
      <Accordion
        overrides={{
          Root: {
            style: {
              marginLeft: isNested ? '8px' : '0px',
              width: 'auto',
            },
          },
          Header: {
            style: {
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '8px',
              paddingRight: '8px',
              fontSize: '16px',
              borderBottomWidth: 0,
            },
          },
          Content: {
            style: {
              backgroundColor: 'transparent',
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: '8px',
              paddingRight: 0,
              borderBottomWidth: 0,
            },
          },
        }}
        expanded={expanded as string[]}
        onChange={handleChange}
        accordion={false}
      >
        {Object.keys(overridesObj).map(overrideKey => {
          const {nested} = overridesObj[overrideKey];
          return (
            <Panel
              key={overrideKey}
              title={
                <span>
                  {overrideKey}
                  {nested ? (
                    <NestedTooltip
                      name={componentName}
                      nestedName={nested.componentName}
                    />
                  ) : null}
                </span>
              }
            >
              {nested ? (
                <Overrides
                  overrides={{
                    ...nested.props.overrides,
                    value:
                      overrides.value && overrides.value[overrideKey]
                        ? overrides.value[overrideKey].nestedValue
                        : undefined,
                  }}
                  componentConfig={nested.props}
                  componentName={nested.componentName}
                  set={(propValue: any) => {
                    set(
                      {
                        ...getNewState(expanded as string[]),
                        [overrideKey]: {
                          active: Object.entries(propValue).some(
                            ([, val]: any) => val.active,
                          ),
                          nestedValue: propValue,
                        },
                      },
                      'overrides',
                    );
                  }}
                  isNested
                />
              ) : (
                <Override
                  key={overrideKey}
                  overrideKey={overrideKey}
                  overridesObj={overridesObj}
                  overrides={overrides}
                  componentConfig={componentConfig}
                  componentName={componentName}
                  set={set}
                />
              )}
            </Panel>
          );
        })}
      </Accordion>
    </React.Fragment>
  );
};

export default Overrides;
