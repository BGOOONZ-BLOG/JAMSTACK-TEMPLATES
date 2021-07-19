import * as React from 'react';
import { StandardProps } from '..';
import { Orientation } from './Stepper';
import { TransitionDuration, TransitionProps } from '../internal/transition';

export interface StepContentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, StepContentClasskey> {
  active?: boolean;
  alternativeLabel?: boolean;
  children: React.ReactNode;
  completed?: boolean;
  last?: boolean;
  optional?: boolean;
  orientation?: Orientation;
  transition?: React.ComponentType<TransitionProps>;
  transitionDuration?: TransitionDuration | 'auto';
}

export type StepContentClasskey = 'root' | 'last' | 'transition';

declare const StepContent: React.ComponentType<StepContentProps>;

export default StepContent;
