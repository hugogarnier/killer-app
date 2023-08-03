import React from 'react';

import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'feed',
};

type Data = {
  name: string;
  headerShown: boolean;
};
const data: Data[] = [
  {
    name: 'feed',
    headerShown: true,
  },
  {
    name: 'profile',
    headerShown: true,
  },
];

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
    >
      {data.map((item) => {
        return (
          <Stack.Screen
            key={item.name}
            name={item.name}
            options={{
              headerShown: item.headerShown,
              headerTitleStyle: { fontFamily: 'IBMPlexMono_400Regular' },
            }}
          />
        );
      })}

      <Stack.Screen
        name="create"
        options={{
          presentation: 'transparentModal',
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="join"
        options={{
          presentation: 'transparentModal',
          animation: 'none',
        }}
      />
    </Stack>
  );
}
