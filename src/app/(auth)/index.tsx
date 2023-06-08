import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useAuth0 } from 'react-native-auth0';

import { useAuthStore } from '../../stores';
import { Button, Layout } from '../../ui';
import { WomanComputer } from '../../ui/Icons';

export default function Page() {
  const { auth, clearUser } = useAuthStore();

  const { authorize, user, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && user) {
      auth({ user: { username: user.name, id: user.sub, uri: user.picture } });
    }
    if (!user) {
      clearUser();
    }
  }, [auth, clearUser, isLoading, user]);

  const login = async () => {
    try {
      await authorize({ scope: 'openid profile email' }, { customScheme: 'killer-app' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <View className="justify-center items-center space-y-40">
        <WomanComputer height={300} />
        <Button variant="secondary" onPress={login} text="se connecter" />
      </View>
    </Layout>
  );
}
