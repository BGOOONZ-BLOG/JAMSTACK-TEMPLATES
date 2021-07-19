---
filename: /src/Radio/Radio.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Radio



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checked | union:&nbsp;bool&nbsp;&#124;<br>&nbsp;string<br> |  | If `true`, the component is checked. |
| checkedIcon | node |  | The icon to display when the component is checked. |
| classes | object |  | Useful to extend the style applied to components. |
| disabled | bool |  | If `true`, the switch will be disabled. |
| disableRipple | bool |  | If `true`, the ripple effect will be disabled. |
| icon | node |  | The icon to display when the component is unchecked. |
| inputProps | object |  | Properties applied to the `input` element. |
| inputRef | func |  | Use that property to pass a ref callback to the native input component. |
| inputType | string |  | The input component property `type`. |
| name | string |  |  |
| onChange | func |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* The event source of the callback<br>*checked:* The `checked` value of the switch |
| value | string |  | The value of the component. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `default`
- `checked`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Radio/Radio.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiRadio`.

## Demos

- [Selection Controls](/demos/selection-controls)

