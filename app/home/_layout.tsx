import React from 'react';

import { Tabs } from 'expo-router';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'feed/index',
};
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarIcon: () => null,
        tabBarActiveTintColor: '#0168FF',
        tabBarInactiveTintColor: '#333333',
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="feed/index"
        options={{
          tabBarLabel: 'accueil',
        }}
      />
      <Tabs.Screen
        name="createjoin/index"
        options={{
          tabBarLabel: 'créer - rejoindre',
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          tabBarLabel: 'profil',
        }}
      />
    </Tabs>
  );
}
