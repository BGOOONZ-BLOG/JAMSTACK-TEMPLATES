---
filename: /src/BottomNavigation/BottomNavigationAction.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# BottomNavigationAction



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | object |  | Useful to extend the style applied to components. |
| icon | node |  | The icon element. |
| label | node |  | The label element. |
| showLabel | bool |  | If `true`, the BottomNavigationAction will show its label. |
| value | any |  | You can provide your own value. Otherwise, we fallback to the child position index. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `selected`
- `selectedIconOnly`
- `wrapper`
- `label`
- `selectedLabel`
- `hiddenLabel`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/BottomNavigation/BottomNavigationAction.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiBottomNavigationAction`.

## Inheritance

The properties of the [&lt;ButtonBase /&gt;](/api/button-base) component are also available.

## Demos

- [Bottom Navigation](/demos/bottom-navigation)

