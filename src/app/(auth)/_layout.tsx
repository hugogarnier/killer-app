import React from 'react';

// import { Stack } from 'expo-router';

// export default function AuthLayout() {
//   return (
//     <Stack>
//       <Stack.Screen
//         name="login/index"
//         options={{ headerTitle: 'se connecter', headerBackTitleVisible: false }}
//       />
//       <Stack.Screen
//         name="register/index"
//         options={{ headerTitle: "s'enregistrer", headerBackTitleVisible: false }}
//       />
//     </Stack>
//   );
// }

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
