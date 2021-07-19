# ember-[tachyons](http://tachyons.io)-components

100% mobile-first, responsive UI library for building ambitious Ember applications.

## Installation

```sh
ember install ember-tachyons-components
```

## Usage

##### Flag Object

```hbs
{{#t-flag-object collapse="m" as |t|}}
  {{#t.inner maxWidth="5"}}
    <img src="/img/super-wide.jpg" alt="A bright blue sky" />
  {{/t.inner}}
  {{#t.inner}}
    <p class="lh-copy">
      For desktop, this text is vertically aligned middle, no matter what the height of the image is.
      On mobile, this is a paragraph below an image.
    </p>
  {{/t.inner}}
{{/t-flag-object}}
```

###### Properties

property | values | default | behavior
-------- | ------ | ------- | -------
`collapse` | `s`,`m`,`none` | `none` | Specify which viewport the flag object collapses.
`maxWidth` | `1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`none` | `none` | Specify the max width of the object.

##### Card

```hbs
{{#t-card border="none" as |t|}}
  {{t.avatar borderRadius="circle" src="/img/avatar_1.jpg"}}
  {{#t.title}}
    Mimi Whitehouse
  {{#t.title}}
  {{t.hr borderColor="black-10"}}
  {{#t.description}}
    Quite affectionate and outgoing.
    She loves to get chin scratches and will roll around on the floor waiting for you give her more of them.
  {{/t.description}}
{{/t-card}}
```

###### Properties

property | values | default | behavior
-------- | ------ | ------- | -------
`border` | `solid`,`dashed`,`dotted`,`none` | `solid` | Specify border style
`borderWidth` | `1`,`2`,`3`,`4`,`5` | `1` | Specify border width
`borderRadius` | `0`,`1`,`2`,`3`,`4`,`5`,`circle` | Card: `2`, Avatar: `circle` | Specify the border radius of the card or avatar
`borderColor` | [See all color names](http://tachyons.io/docs/themes/skins/) | `black-10` | Specify the border color for the card
