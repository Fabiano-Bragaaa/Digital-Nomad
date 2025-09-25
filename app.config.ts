module.exports = {
  "name": "Nomad",
  "slug": "digital-nomad-app",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/images/icon.png",
  "scheme": "digitalnomadapp",
  "userInterfaceStyle": "automatic",
  "newArchEnabled": true,
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": "com.anonymous.digital-nomad-app",
    "infoPlist": {
      "ITSAppUsesNonExemptEncryption": false
    }
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/images/adaptive-icon.png",
      "backgroundColor": "#1B1B1B"
    },
    "edgeToEdgeEnabled": true,
    "package": "com.anonymous.digitalnomadapp"
  },
  "web": {
    "bundler": "metro",
    "output": "static",
    "favicon": "./assets/images/favicon.png"
  },
  "plugins": [
    "expo-router",
    [
      "expo-splash-screen",
      {
        "image": "./assets/images/splash-icon.png",
        "imageWidth": 200,
        "resizeMode": "contain",
        "backgroundColor": "#1B1B1B"
      }
    ]
  ],
  "experiments": {
    "typedRoutes": true
  },
  "extra": {
    "router": {},
    "eas": {
      "projectId": "1f94b47c-61e9-4d80-8ffc-13a8327e720f"
    }
  }
}