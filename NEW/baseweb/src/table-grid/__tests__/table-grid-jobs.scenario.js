/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {format} from 'date-fns';

import {Button} from '../../button/index.js';
import {Heading, HeadingLevel} from '../../heading/index.js';
import ChevronDown from '../../icon/chevron-down.js';
import ChevronRight from '../../icon/chevron-right.js';
import Overflow from '../../icon/overflow.js';
import {StyledLink} from '../../link/index.js';
import {StatefulMenu} from '../../menu/index.js';
import {StatefulPopover, PLACEMENT} from '../../popover/index.js';
import {styled, withStyle, useStyletron} from '../../styles/index.js';
import {Tag} from '../../tag/index.js';

import {StyledTable, StyledHeadCell, StyledBodyCell} from '../index.js';
import {useCellNavigation} from './shared.js';

type StatusT = 'running' | 'passed' | 'failed';
type RowT = [string, StatusT, Date, string, string, string, TaskT[]];
type TaskT = [string, StatusT, Date, string, string];
function buildRow(status: StatusT): RowT {
  return [
    'Baseui Github CI Job',
    status,
    new Date(2019, 6, 22),
    'feat(side-navigation): improve item rendering performance',
    'https://github.com/uber/baseweb/pull/1449',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    [
      [
        'buildkite/baseui',
        'running',
        new Date(2019, 6, 22),
        'Build #7728 passed (20 minutes, 1 second)',
        'https://buildkite.com/uberopensource/baseui/builds/7728',
      ],
      [
        'buildkite/baseui/docker-package-e2e',
        'running',
        new Date(2019, 6, 22),
        'Passed (6 minutes, 44 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728#54927bc9-88e0-4d0b-80b0-f60b8a2298e4',
      ],
      [
        'buildkite/baseui/docker-package-unit',
        'passed',
        new Date(2019, 6, 22),
        'Passed (7 minutes)',
        'https://buildkite.com/uberopensource/baseui/builds/7728#fea8c317-b65b-4c5f-9fad-b7a329a26237',
      ],
      [
        'buildkite/baseui/documentation-site-link-checker',
        'failed',
        new Date(2019, 6, 22),
        'Passed (1 minute, 33 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728#eaa5998f-69a4-4b94-9a9b-4dd2bbd8c985',
      ],
      [
        'buildkite/baseui/eslint',
        'passed',
        new Date(2019, 6, 22),
        'Passed (1 minute, 34 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728#a658a503-472f-43aa-80b5-708d39951cf7',
      ],
      [
        'buildkite/baseui/flowtype',
        'passed',
        new Date(2019, 6, 22),
        'Passed (1 minute, 33 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728',
      ],
      [
        'buildkite/baseui/jest',
        'running',
        new Date(2019, 6, 22),
        'Passed (1 minute, 33 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728',
      ],
      [
        'buildkite/baseui/pipeline',
        'running',
        new Date(2019, 6, 22),
        'Passed (1 minute, 33 seconds)',
        'https://buildkite.com/uberopensource/baseui/builds/7728',
      ],
    ],
  ];
}

const data = [
  buildRow('running'),
  buildRow('running'),
  buildRow('failed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('failed'),
  buildRow('failed'),
  buildRow('failed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('passed'),
  buildRow('passed'),
];

function statusToTagKind(status: StatusT) {
  switch (status) {
    case 'running': {
      return 'primary';
    }
    case 'passed': {
      return 'positive';
    }
    case 'failed': {
      return 'negative';
    }
    default: {
      return 'neutral';
    }
  }
}

function Tasks(props: {tasks: TaskT[]}) {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        gridColumn: 'span 5',
        padding: '32px 24px',
      })}
    >
      <StyledTable $gridTemplateColumns="max-content auto auto auto">
        <StyledHeadCell $sticky={false}>Task</StyledHeadCell>
        <StyledHeadCell $sticky={false}>Status</StyledHeadCell>
        <StyledHeadCell $sticky={false}>Last Run</StyledHeadCell>
        <StyledHeadCell $sticky={false}>Details</StyledHeadCell>
        {props.tasks.map((task, index) => {
          return (
            <>
              <StyledBodyCell>{task[0]}</StyledBodyCell>
              <StyledBodyCell>
                <Tag
                  closeable={false}
                  variant="outlined"
                  kind={statusToTagKind(task[1])}
                >
                  {task[1]}
                </Tag>
              </StyledBodyCell>
              <StyledBodyCell>
                {format(task[2], 'yyyy-MM-dd h:mm a')}
              </StyledBodyCell>
              <StyledBodyCell>
                <StyledLink href={task[4]}>{task[3]}</StyledLink>
              </StyledBodyCell>
            </>
          );
        })}
      </StyledTable>
    </div>
  );
}

const CenteredBodyCell = withStyle<typeof StyledBodyCell>(StyledBodyCell, {
  display: 'flex',
  alignItems: 'center',
});

const Truncate = styled('div', {
  textOverflow: 'ellipsis',
  maxWidth: '200px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

type RowPropsT = {|
  getCellProps: number => {},
  striped: boolean,
  row: RowT,
|};
function Row(props: RowPropsT) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      <CenteredBodyCell {...props.getCellProps(0)} $striped={props.striped}>
        <Button
          size="compact"
          kind="minimal"
          onClick={() => setExpanded(!expanded)}
          shape="square"
        >
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </Button>
        {props.row[0]}
      </CenteredBodyCell>
      <CenteredBodyCell {...props.getCellProps(1)} $striped={props.striped}>
        <Tag
          closeable={false}
          variant="outlined"
          kind={statusToTagKind(props.row[1])}
        >
          {props.row[1]}
        </Tag>
      </CenteredBodyCell>
      <CenteredBodyCell {...props.getCellProps(2)} $striped={props.striped}>
        <StyledLink href={props.row[4]}>{props.row[3]}</StyledLink>
      </CenteredBodyCell>
      <CenteredBodyCell {...props.getCellProps(3)} $striped={props.striped}>
        {format(props.row[2], 'yyyy-MM-dd h:mm a')}
      </CenteredBodyCell>
      <CenteredBodyCell {...props.getCellProps(4)} $striped={props.striped}>
        <Truncate>{props.row[5]}</Truncate>
        <StatefulPopover
          placement={PLACEMENT.bottomLeft}
          content={({close}) => (
            <StatefulMenu
              items={[
                {label: 'Item One'},
                {label: 'Item Two'},
                {label: 'Item Three'},
                {label: 'Item Four'},
              ]}
              onItemSelect={() => close()}
              overrides={{List: {style: {height: '144px', width: '138px'}}}}
            />
          )}
        >
          <Button shape="square" kind="minimal" size="compact">
            <Overflow size={18} />
          </Button>
        </StatefulPopover>
      </CenteredBodyCell>
      {expanded && <Tasks tasks={props.row[6]} />}
    </>
  );
}

export default function Scenario() {
  const [css] = useStyletron();
  const {getCellProps} = useCellNavigation();

  return (
    <div className={css({height: '600px'})}>
      <HeadingLevel>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          <Heading styleLevel={4}>Jobs</Heading>
          <Button>Create Job</Button>
        </div>
      </HeadingLevel>

      <StyledTable
        tabIndex="0"
        role="grid"
        $gridTemplateColumns="auto auto max-content auto auto"
      >
        <StyledHeadCell {...getCellProps(0, 0)}>Job Name</StyledHeadCell>
        <StyledHeadCell {...getCellProps(1, 0)}>Status</StyledHeadCell>
        <StyledHeadCell {...getCellProps(2, 0)}>Pull Request</StyledHeadCell>
        <StyledHeadCell {...getCellProps(3, 0)}>Last Run</StyledHeadCell>
        <StyledHeadCell {...getCellProps(4, 0)}>Details</StyledHeadCell>

        {data.map((row, rowIndex) => {
          const striped = rowIndex % 2 === 0;
          return (
            <Row
              getCellProps={columnIndex =>
                getCellProps(columnIndex, rowIndex + 1)
              }
              key={rowIndex}
              row={row}
              striped={striped}
            />
          );
        })}
      </StyledTable>
    </div>
  );
}
