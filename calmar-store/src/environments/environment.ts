// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_api: 'https://platzi-store.herokuapp.com',
  firebase: {
    apiKey: 'AIzaSyClNDRuCdV4mRFgEB5laF2H-t6Q71bKFjo',
    authDomain: 'tienda-calmar.firebaseapp.com',
    projectId: 'tienda-calmar',
    storageBucket: 'tienda-calmar.appspot.com',
    messagingSenderId: '1075682819372',
    appId: '1:1075682819372:web:64f00dd05f5414438c8089'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
