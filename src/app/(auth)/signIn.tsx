import React, { useEffect } from 'react';
import { View } from 'react-native';

import { Stack } from 'expo-router';
import { useAuth0 } from 'react-native-auth0';

import { usePostUser } from '../../services';
import { Button, Layout } from '../../ui';
import { WomanComputer } from '../../ui/Icons';

export default function SignIn() {
  const { authorize, user } = useAuth0();
  const { mutate } = usePostUser();

  useEffect(() => {
    if (user) {
      mutate(
        { user },
        {
          onSuccess: (message) => console.log(message),
          onError: (message) => console.log(message),
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const login = async () => {
    try {
      await authorize({ scope: 'openid profile email' }, { customScheme: 'killer-app' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Stack.Screen />
      <View className="justify-center items-center space-y-40">
        <WomanComputer height={300} />
        <Button variant="secondary" onPress={login} text="se connecter" />
      </View>
    </Layout>
  );
}
