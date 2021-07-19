import * as React from 'react';

export type TransitionDuration = number | { enter: number; exit: number };
export type TransitionCallback = (element: HTMLElement) => void;

export interface TransitionHandlers {
  onEnter: TransitionCallback;
  onEntering: TransitionCallback;
  onEntered: TransitionCallback;
  onExit: TransitionCallback;
  onExiting: TransitionCallback;
  onExited: TransitionCallback;
}

export interface TransitionProps extends Partial<TransitionHandlers> {
  children: React.ReactElement<any> | Function;
  style?: React.CSSProperties;
  className?: string;
  in: boolean;
  appear?: boolean;
  unmountOnExit?: boolean;
}
