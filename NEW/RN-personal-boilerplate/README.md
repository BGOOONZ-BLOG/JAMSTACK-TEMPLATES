## Personal RN boilerplate

1- Make sure to create a `local.properties` inside `/android` directory

2- Then write this `sdk.dir = /Users/<username>/Library/Android/sdk` (replace `<username>` with your username)

if you run somehow through this error: https://github.com/facebook/react-native/issues/7308

Run this cmd: `killall -9 node` to kill any node port running.

If you run somehow through this error: `unable to load script from assets index.android.bundle`

Run this cmd: `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

Don't hesitate to get in touch in case you ran in issues not mentioned above

### Features

- Stateless functional components using Recompose
- Screens setup with react-navigation
- Redux store setup and configured
- Nice file structure
- Eslint
- Client side error handling with formik and validation with yup
- Server side errors show up easily, you need to pass the right errors object from the backend
- Common used elements styled and ready to use `// More to be added`
- i18n with react-intl

and more....

### Libraries used

```js
"axios": "^0.18.0",
"eslint": "^5.6.0",
"formik": "^1.3.0",
"global": "^4.3.2",
"react": "16.5.0",
"react-native": "0.57.1",
"react-navigation": "^2.16.0",
"react-redux": "^5.0.7",
"recompose": "^0.30.0",
"redux": "^4.0.0",
"redux-thunk": "^2.3.0",
"styled-components": "^4.0.0-beta.8-unpure",
"yup": "^0.26.6",
"react-intl": "^2.7.0",
"react-native-swiper": "^1.5.13",
```

### Todo

- [x] Setup actions/reducer boilerplate for auth
- [ ] Write an article connecting a rest api with this boilerplate
- [ ] Apply redux-thunk
- [ ] Prepare more most common used elements (checkbox, radio button...)
- [ ] Add good looking loaders
- [ ] Add server side errors
