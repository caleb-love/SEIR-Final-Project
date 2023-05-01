import 'dotenv/config'

export default {
  "expo": {
    "name": "dinder-v2",
    "slug": "dinder-v2",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/loading.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "scheme": "mycoolredirect",
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.caleblove.dinder-v2"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff",
        "package": "com.caleblove.dinder-v2"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "563c4cad-73f8-4613-9f4e-7b83b51023c2"
      },
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
      googleMapsAPI: process.env.GOOGLE_MAPS_API
    },
    "owner": "caleblove"
  }
}