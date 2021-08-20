---
filename: /src/Paper/Paper.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Paper



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| elevation | number | 2 | Shadow depth, corresponds to `dp` in the spec. It's accepting values between 0 and 24 inclusive. |
| square | bool | false | If `true`, rounded corners are disabled. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `rounded`
- `shadow0`
- `shadow1`
- `shadow2`
- `shadow3`
- `shadow4`
- `shadow5`
- `shadow6`
- `shadow7`
- `shadow8`
- `shadow9`
- `shadow10`
- `shadow11`
- `shadow12`
- `shadow13`
- `shadow14`
- `shadow15`
- `shadow16`
- `shadow17`
- `shadow18`
- `shadow19`
- `shadow20`
- `shadow21`
- `shadow22`
- `shadow23`
- `shadow24`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Paper/Paper.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiPaper`.

## Demos

- [Autocomplete](/demos/autocomplete)
- [Paper](/demos/paper)

