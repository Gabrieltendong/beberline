module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      [
        "module:react-native-dotenv", 
        {
          "moduleName": "@env",
          "path": ".env",
        }
      ],
      "react-native-reanimated/plugin",
    ]
  };
};


// › Metro waiting on exp://192.168.100.19:19001
// › Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

// › Press a │ open Android
// › Press w │ open web

// › Press r │ reload app
// › Press m │ toggle menu
// › Press d │ show developer tools
// › shift+d │ toggle auto opening developer tools on startup (enabled)

// › Press ? │ show all commands