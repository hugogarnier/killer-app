export default () => ({
  expo: {
    scheme: 'killer-app',
    web: {
      bundler: 'metro',
    },
    name: 'killer-app',
    slug: 'killer-app',
    plugins: ['react-native-email-link'],
    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: '603e87f9-f4b9-4759-93f9-f76b238fc075',
      },
    },
  },
});
