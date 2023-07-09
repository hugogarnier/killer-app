import React from 'react';
import { View } from 'react-native';

import { useRouter } from 'expo-router';

import { useAuthStore } from '../../stores';
import { Button, Layout } from '../../ui';
import { WomanComputer } from '../../ui/Icons';

export default function Page() {
  const { oauth, session } = useAuthStore();
  const router = useRouter();

  const loginGoogle = async () => {
    try {
      await oauth('google');
      if (session) router.replace('/home/feed');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <View className="justify-center items-center space-y-40">
        <WomanComputer height={300} />
        <View>
          <Button
            variant="secondary"
            onPress={loginGoogle}
            icon="google"
            text="se connecter avec google"
          />
        </View>
      </View>
    </Layout>
  );
}
