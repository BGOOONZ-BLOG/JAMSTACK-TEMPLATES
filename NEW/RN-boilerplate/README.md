## Personal RN boilerplate with native base

1- Make sure to create a `local.properties` inside `/android` directory

2- Then write this `sdk.dir = /Users/<username>/Library/Android/sdk` (replace `<username>` with your username)

if you run somehow through this error: https://github.com/facebook/react-native/issues/7308

Run this cmd: `killall -9 node` to kill any node port running.

If you run somehow through this error: `unable to load script from assets index.android.bundle`

Run this cmd: `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
