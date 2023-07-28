import React, { FC } from 'react';
import { View } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';

import { useAuthStore } from '../../stores';
import { Text } from '../../ui';
import { Avatar } from '../Avatar';

type CustomDrawerProps = DrawerContentComponentProps;
export const CustomDrawer: FC<CustomDrawerProps> = (props) => {
  const { user } = useAuthStore();

  return (
    <View className="flex-1 pb-8">
      <DrawerContentScrollView {...props} contentContainerStyle={{}}>
        <View className="flex-1 items-center space-y-2 pb-10">
          <Link href={'/profile'}>
            <Animated.View sharedTransitionTag="sharedTag">
              <Avatar uri={user.uri} />
            </Animated.View>
          </Link>

          <Text variant="tertiary" className="text-lg">
            {user.username}
          </Text>
        </View>
        <DrawerItemList
          state={undefined}
          navigation={undefined}
          descriptors={undefined}
          {...props}
        />
      </DrawerContentScrollView>
      <View className="justify-center items-center">
        <Text variant="tertiary">killer-app v1.0.0</Text>
      </View>
    </View>
  );
};
