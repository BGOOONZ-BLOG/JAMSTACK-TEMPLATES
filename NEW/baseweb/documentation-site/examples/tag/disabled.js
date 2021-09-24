// @flow
import * as React from 'react';
import {Tag, VARIANT} from 'baseui/tag';

const variants = Object.keys(VARIANT);
const onClick = kind => alert(`${kind} tag is clicked`);

export default function Example() {
  return (
    <React.Fragment>
      {variants.map((variant, index) => (
        <React.Fragment key={index}>
          <Tag
            disabled
            onClick={() => {
              onClick('neutral');
            }}
            variant={variant}
            kind="neutral"
          >
            neutral
          </Tag>
          <Tag
            disabled
            onClick={() => {
              onClick('primary');
            }}
            variant={variant}
            kind="primary"
          >
            primary
          </Tag>
          <Tag
            disabled
            onClick={() => {
              onClick('accent');
            }}
            variant={variant}
            kind="accent"
          >
            accent
          </Tag>
          <Tag
            disabled
            onClick={() => {
              onClick('positive');
            }}
            variant={variant}
            kind="positive"
          >
            positive
          </Tag>
          <Tag
            disabled
            onClick={() => {
              onClick('warning');
            }}
            variant={variant}
            kind="warning"
          >
            warning
          </Tag>
          <Tag
            disabled
            onClick={() => {
              onClick('negative');
            }}
            variant={variant}
            kind="negative"
          >
            negative
          </Tag>
          <br />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
