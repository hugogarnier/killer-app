import React from 'react';

import { Tabs } from 'expo-router';

import { colors } from '../../../constants';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'feed',
};
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarIcon: () => null,
        tabBarActiveTintColor: colors.pure,
        tabBarInactiveTintColor: colors.gray800,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          tabBarLabel: 'accueil',
        }}
      />
      <Tabs.Screen
        name="createjoin"
        options={{
          tabBarLabel: 'créer - rejoindre',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'profil',
        }}
      />
    </Tabs>
  );
}
