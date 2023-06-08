import React from 'react';
import { Image, Text, View } from 'react-native';

import { useRouter } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';

import { useAuthStore } from '../../../stores';
import { Button, Layout } from '../../../ui';

export default function Index() {
  const { user } = useAuthStore();
  const { clearSession } = useAuth0();
  const router = useRouter();

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
      <View className="flex-1 justify-between">
        <View className="items-center space-y-4">
          <Text className="text-2xl">{user.username}</Text>
          <View className="h-28 w-28 rounded-full overflow-hidden border-[1px]">
            <Image source={{ uri: user.uri }} className="h-full w-full" resizeMode="cover" />
          </View>
        </View>

        <Button variant="secondary" onPress={logout} text="se déconnecter" />
      </View>
    </Layout>
  );
}
