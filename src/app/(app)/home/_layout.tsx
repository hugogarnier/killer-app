/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { SimpleLineIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

import { CustomDrawer } from '../../../components';
import { colors } from '../../../constants';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'feed',
};

function CustomIcon(props: {
  name: React.ComponentProps<typeof SimpleLineIcons>['name'];
  color: string;
  size: number;
}) {
  return <SimpleLineIcons name={props.name} color={props.color} size={props.size} />;
}

type Data = {
  name: string;
  drawerLabel: string;
  headerShown: boolean;
  headerTitle: string;
  icon: React.ComponentProps<typeof SimpleLineIcons>['name'];
};
const data: Data[] = [
  {
    name: 'feed',
    drawerLabel: 'accueil',
    headerShown: true,
    headerTitle: 'liste des parties',
    icon: 'home',
  },
  {
    name: 'create',
    drawerLabel: 'créer une partie',
    headerShown: true,
    headerTitle: '',
    icon: 'plus',
  },
  {
    name: 'join',
    drawerLabel: 'rejoindre une partie',
    headerShown: true,
    headerTitle: '',
    icon: 'login',
  },
  {
    name: 'settings',
    drawerLabel: 'options',
    headerShown: true,
    headerTitle: 'options',
    icon: 'settings',
  },
];

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        drawerActiveTintColor: colors.pure,
        drawerInactiveTintColor: colors.gray800,
      }}
    >
      {data.map((item) => {
        return (
          <Drawer.Screen
            key={item.name}
            name={item.name}
            options={{
              drawerLabelStyle: { fontFamily: 'IBMPlexMono_400Regular' },
              drawerLabel: item.drawerLabel,
              headerShown: item.headerShown,
              headerTitle: item.headerTitle,
              headerTitleStyle: { fontFamily: 'IBMPlexMono_400Regular' },
              headerTitleAlign: 'center',
              drawerIcon: ({ color, size }) => (
                <CustomIcon name={item.icon} color={color} size={size} />
              ),
            }}
          />
        );
      })}
    </Drawer>
  );
}
