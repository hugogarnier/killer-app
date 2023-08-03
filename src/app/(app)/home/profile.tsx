import React from 'react';
import { View } from 'react-native';

// import { useQuery } from '@tanstack/react-query';
import {
  Stack,
  // useFocusEffect,
} from 'expo-router';
import { useAuth0 } from 'react-native-auth0';
// import Animated from 'react-native-reanimated';

import { Avatar } from '../../../components';
// import { getGamesFromPlayer } from '../../../services/functions/players';
// import { QUERIES } from '../../../services/types';
import { defaultUser } from '../../../constants';
import { useAuthStore } from '../../../stores';
// import { Player } from '../../../types';
import { Button, Header, Layout, Text } from '../../../ui';

const HeaderScreen = () => <Header variant="secondary" />;

export default function Index() {
  const { user, clearUser } = useAuthStore();
  const { clearSession } = useAuth0();

  const userExists = (user && user) || defaultUser;

  // const [games, setGames] = useState<Player[]>([]);

  // const { refetch, data, isSuccess } = useQuery({
  //   queryKey: [QUERIES.PLAYERS_GAMES],
  //   queryFn: () => getGamesFromPlayer({ id: user.id }),
  //   enabled: false,
  // });

  // useFocusEffect(() => {
  //   refetch();

  //   if (data && isSuccess) {
  //     setGames(data);
  //   }
  // });

  const logout = async () => {
    try {
      await clearSession({ customScheme: 'killer-app' });
      clearUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Stack.Screen
        options={{
          header: HeaderScreen,
        }}
      />
      <View className="flex-1 justify-between">
        <View className="items-center">
          <Avatar uri={userExists.uri} />
          <Text className="text-2xl pb-4">{userExists.username}</Text>
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
