/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import {KIND, SIZE, SHAPE} from './constants.js';
import type {SharedStylePropsT} from './types.js';

export const BaseButton = styled<SharedStylePropsT>(
  'button',
  ({
    $theme,
    $size,
    $kind,
    $shape,
    $isLoading,
    $isSelected,
    $disabled,
    $isFocusVisible,
  }) => ({
    display: 'inline-flex',
    // need to maintain button width while showing loading spinner
    flexDirection: $isLoading ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftStyle: 'none',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderBottomStyle: 'none',
    outline: 'none',
    boxShadow: $isFocusVisible
      ? `inset 0 0 0 3px ${$theme.colors.accent}`
      : 'none',
    textDecoration: 'none',
    WebkitAppearance: 'none',
    transitionProperty: 'background',
    transitionDuration: $theme.animation.timing200,
    transitionTimingFunction: $theme.animation.linearCurve,
    cursor: 'pointer',
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: $theme.colors.buttonDisabledFill,
      color: $theme.colors.buttonDisabledText,
    },
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    ...getFontStyles({$theme, $size}),
    ...getBorderRadiiStyles({$theme, $size, $shape}),
    ...getPaddingStyles({$theme, $size, $shape}),
    // Kind style override
    ...getKindStyles({$theme, $kind, $isLoading, $isSelected, $disabled}),
    ...getShapeStyles({$theme, $shape, $size}),
  }),
);

export const EndEnhancer = styled<SharedStylePropsT>('div', ({$theme}) => {
  const marginDirection: string =
    $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  return {
    display: 'flex',
    [marginDirection]: $theme.sizing.scale500,
  };
});

export const StartEnhancer = styled<SharedStylePropsT>('div', ({$theme}) => {
  const marginDirection: string =
    $theme.direction === 'rtl' ? 'marginLeft' : 'marginRight';
  return {
    display: 'flex',
    [marginDirection]: $theme.sizing.scale500,
  };
});

export const LoadingSpinnerContainer = styled<SharedStylePropsT>(
  'div',
  ({$theme, $size}) => {
    // we don't have a theming value for this
    let margins = '3px';
    if ($size === SIZE.mini || $size === SIZE.compact) {
      margins = $theme.sizing.scale0;
    }
    if ($size === SIZE.large) {
      margins = $theme.sizing.scale100;
    }

    return {
      lineHeight: 0,
      position: 'static',
      marginBottom: margins,
      marginTop: margins,
    };
  },
);

export const LoadingSpinner = styled<SharedStylePropsT>(
  'span',
  ({$theme, $kind, $disabled, $size}) => {
    const {foreground, background} = getLoadingSpinnerColors({
      $theme,
      $kind,
      $disabled,
    });

    let dimension = $theme.sizing.scale550;
    if ($size === SIZE.mini || $size === SIZE.compact) {
      dimension = $theme.sizing.scale500;
    }
    if ($size === SIZE.large) {
      dimension = $theme.sizing.scale600;
    }

    return {
      height: dimension,
      width: dimension,
      borderTopLeftRadius: '50%',
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
      borderBottomLeftRadius: '50%',
      borderLeftStyle: 'solid',
      borderTopStyle: 'solid',
      borderRightStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftWidth: $theme.sizing.scale0,
      borderTopWidth: $theme.sizing.scale0,
      borderRightWidth: $theme.sizing.scale0,
      borderBottomWidth: $theme.sizing.scale0,
      borderTopColor: foreground,
      borderLeftColor: background,
      borderBottomColor: background,
      borderRightColor: background,
      boxSizing: 'border-box',
      display: 'inline-block',
      animationDuration: $theme.animation.timing700,
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      animationName: {
        to: {
          transform: 'rotate(360deg)',
        },
        from: {
          transform: 'rotate(0deg)',
        },
      },
    };
  },
);

function getLoadingSpinnerColors({$theme, $kind, $disabled}) {
  if ($disabled) {
    return {
      foreground: $theme.colors.buttonDisabledSpinnerForeground,
      background: $theme.colors.buttonDisabledSpinnerBackground,
    };
  }
  switch ($kind) {
    case KIND.secondary: {
      return {
        foreground: $theme.colors.buttonSecondarySpinnerForeground,
        background: $theme.colors.buttonSecondarySpinnerBackground,
      };
    }
    case KIND.tertiary: {
      return {
        foreground: $theme.colors.buttonTertiarySpinnerForeground,
        background: $theme.colors.buttonTertiarySpinnerBackground,
      };
    }
    case KIND.minimal: {
      return {
        foreground: $theme.colors.buttonMinimalSpinnerForeground,
        background: $theme.colors.buttonMinimalSpinnerBackground,
      };
    }
    case KIND.primary:
    default: {
      return {
        foreground: $theme.colors.buttonPrimarySpinnerForeground,
        background: $theme.colors.buttonPrimarySpinnerBackground,
      };
    }
  }
}

function getBorderRadiiStyles({$theme, $size, $shape}) {
  let value = $theme.borders.buttonBorderRadius;

  if ($shape === SHAPE.pill) {
    if ($size === SIZE.compact) {
      value = '30px';
    } else if ($size === SIZE.large) {
      value = '42px';
    } else {
      value = '38px';
    }
  } else if ($shape === SHAPE.circle || $shape === SHAPE.round) {
    value = '50%';
  }

  return {
    borderTopRightRadius: value,
    borderBottomRightRadius: value,
    borderTopLeftRadius: value,
    borderBottomLeftRadius: value,
  };
}

function getFontStyles({$theme, $size}) {
  switch ($size) {
    case SIZE.mini:
      return $theme.typography.font150;
    case SIZE.compact:
      return $theme.typography.font250;
    case SIZE.large:
      return $theme.typography.font450;
    default:
      return $theme.typography.font350;
  }
}

function getPaddingStyles({$theme, $size, $shape}) {
  const iconShape =
    $shape === SHAPE.square ||
    $shape === SHAPE.circle ||
    $shape === SHAPE.round;
  switch ($size) {
    case SIZE.mini:
      return {
        paddingTop: $theme.sizing.scale200,
        paddingBottom: $theme.sizing.scale200,
        paddingLeft: iconShape
          ? $theme.sizing.scale200
          : $theme.sizing.scale300,
        paddingRight: iconShape
          ? $theme.sizing.scale200
          : $theme.sizing.scale300,
      };
    case SIZE.compact:
      return {
        paddingTop: $theme.sizing.scale400,
        paddingBottom: $theme.sizing.scale400,
        paddingLeft: iconShape
          ? $theme.sizing.scale400
          : $theme.sizing.scale500,
        paddingRight: iconShape
          ? $theme.sizing.scale400
          : $theme.sizing.scale500,
      };
    case SIZE.large:
      return {
        paddingTop: $theme.sizing.scale600,
        paddingBottom: $theme.sizing.scale600,
        paddingLeft: iconShape
          ? $theme.sizing.scale600
          : $theme.sizing.scale700,
        paddingRight: iconShape
          ? $theme.sizing.scale600
          : $theme.sizing.scale700,
      };
    default:
      return {
        paddingTop: $theme.sizing.scale550,
        paddingBottom: $theme.sizing.scale550,
        paddingLeft: iconShape
          ? $theme.sizing.scale550
          : $theme.sizing.scale600,
        paddingRight: iconShape
          ? $theme.sizing.scale550
          : $theme.sizing.scale600,
      };
  }
}

type KindStylesT = {|
  color?: string,
  backgroundColor?: string,
  ':hover'?: {
    backgroundColor: string,
  },
  ':focus'?: {
    backgroundColor: string,
  },
  ':active'?: {
    backgroundColor: string,
  },
|};
function getKindStyles({
  $theme,
  $isLoading,
  $isSelected,
  $kind,
  $disabled,
}): KindStylesT {
  if ($disabled) {
    return Object.freeze({});
  }
  switch ($kind) {
    case KIND.primary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonPrimarySelectedText,
          backgroundColor: $theme.colors.buttonPrimarySelectedFill,
        };
      }
      return {
        color: $theme.colors.buttonPrimaryText,
        backgroundColor: $theme.colors.buttonPrimaryFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonPrimaryActive
            : $theme.colors.buttonPrimaryHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonPrimaryActive,
        },
      };
    case KIND.secondary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonPrimaryText,
          backgroundColor: $theme.colors.buttonPrimaryFill,
        };
      }
      return {
        color: $theme.colors.buttonSecondaryText,
        backgroundColor: $theme.colors.buttonSecondaryFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonSecondaryActive
            : $theme.colors.buttonSecondaryHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonSecondaryActive,
        },
      };
    case KIND.tertiary:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonTertiarySelectedText,
          backgroundColor: $theme.colors.buttonTertiarySelectedFill,
        };
      }
      return {
        color: $theme.colors.buttonTertiaryText,
        backgroundColor: $theme.colors.buttonTertiaryFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonTertiaryActive
            : $theme.colors.buttonTertiaryHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonTertiaryActive,
        },
      };
    case KIND.minimal:
      if ($isSelected) {
        return {
          color: $theme.colors.buttonMinimalSelectedText,
          backgroundColor: $theme.colors.buttonMinimalSelectedFill,
        };
      }
      return {
        color: $theme.colors.buttonMinimalText,
        backgroundColor: $theme.colors.buttonMinimalFill,
        ':hover': {
          backgroundColor: $isLoading
            ? $theme.colors.buttonMinimalActive
            : $theme.colors.buttonMinimalHover,
        },
        ':active': {
          backgroundColor: $theme.colors.buttonMinimalActive,
        },
      };
    default:
      return Object.freeze({});
  }
}

function getShapeStyles({$theme, $shape, $size}) {
  if ($shape === SHAPE.circle || $shape === SHAPE.square) {
    let height, width;
    switch ($size) {
      case SIZE.mini:
        height = '28px';
        width = '28px';
        break;
      case SIZE.compact:
        height = '36px';
        width = '36px';
        break;
      case SIZE.large:
        height = '56px';
        width = '56px';
        break;
      case SIZE.default:
      default:
        height = '48px';
        width = '48px';
        break;
    }
    return {
      height,
      width,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
    };
  } else {
    return {};
  }
}
