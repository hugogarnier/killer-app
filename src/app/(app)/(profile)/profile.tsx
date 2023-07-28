import React, { useState } from 'react';
import { View } from 'react-native';

import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
import Animated from 'react-native-reanimated';

import { Avatar } from '../../../components';
import { useGetGamesFromPlayer } from '../../../services';
import { useAuthStore } from '../../../stores';
import { Player } from '../../../types';
import { Button, Layout, Text } from '../../../ui';

export default function Index() {
  const { user } = useAuthStore();
  const { clearSession } = useAuth0();
  const router = useRouter();

  const [games, setGames] = useState<Player[]>([]);

  const { refetch } = useGetGamesFromPlayer(
    { id: user.id },
    {
      onSuccess: (response: Player[]) => {
        setGames(response);
      },
      enabled: false,
    },
  );

  useFocusEffect(() => {
    refetch();
  });

  const logout = async () => {
    try {
      await clearSession({ customScheme: 'killer-app' });
      router.replace('/(auth)');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerBackTitleVisible: false,
          headerBackTitle: '',
          title: '',
        }}
      />
      <View className="flex-1 justify-between">
        <View className="items-center">
          <Text className="text-2xl pb-4">{user.username}</Text>
          <Animated.View sharedTransitionTag="sharedTag">
            <Avatar uri={user.uri} />
          </Animated.View>
        </View>

        <View className="justify-center items-center">
          <Text className="text-base">
            {/* Actuellement {games.length} parties sont liées à ton compte */}
            En construction
          </Text>
        </View>

        <Button variant="secondary" onPress={logout} text="se déconnecter" />
      </View>
    </Layout>
  );
}
