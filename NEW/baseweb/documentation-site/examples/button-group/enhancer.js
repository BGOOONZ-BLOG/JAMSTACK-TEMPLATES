// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import Upload from 'baseui/icon/upload.js';

export default function Example() {
  return (
    <ButtonGroup>
      <Button startEnhancer={() => <Upload size={24} />}>
        Label
      </Button>
      <Button startEnhancer={() => <Upload size={24} />}>
        Label
      </Button>
      <Button startEnhancer={() => <Upload size={24} />}>
        Label
      </Button>
    </ButtonGroup>
  );
}
