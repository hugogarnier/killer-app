export default () => ({
  expo: {
    scheme: 'killer-app',
    web: {
      bundler: 'metro',
    },
    name: 'killer-app',
    slug: 'killer-app',
    icon: './src/assets/icon.png',
    splash: {
      image: './src/assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
    },
    android: {
      package: 'com.hdev.killer',
      adaptiveIcon: {
        foregroundImage: './src/assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    ios: {
      bundleIdentifier: 'com.hdev.killer',
    },
    plugins: [
      'react-native-email-link',
      'expo-router',
      [
        'react-native-auth0',
        {
          domain: 'dev-cfycdhy5mfrv2q62.eu.auth0.com',
          customScheme: 'killer-app',
        },
      ],
    ],
    extra: {
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
      AUTH_CLIENT_SECRET: process.env.AUTH_CLIENT_SECRET,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: '603e87f9-f4b9-4759-93f9-f76b238fc075',
      },
    },
    updates: {
      url: 'https://u.expo.dev/603e87f9-f4b9-4759-93f9-f76b238fc075',
    },
    runtimeVersion: {
      policy: 'sdkVersion',
    },
    // experiments: {
    //   typedRoutes: true,
    // },
  },
});
