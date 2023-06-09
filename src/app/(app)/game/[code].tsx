import React, { useState } from 'react';
import { Text } from 'react-native';

import { Stack, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';

import { NotStartedGame, StartedGame } from '../../../components';
import { defaultGame } from '../../../constants';
import { supabase } from '../../../lib';
import { useGetGame } from '../../../services';
import { GameCreated } from '../../../types';
import { Layout } from '../../../ui';

export default function Game() {
  const { code } = useLocalSearchParams();
  const [info, setInfo] = useState<GameCreated>({
    game: defaultGame,
    players: [],
  });

  const { isLoading, isFetching, refetch } = useGetGame(
    { code },
    {
      onSuccess: ({ game, players }) => {
        setInfo({ game, players });
      },
    },
  );

  supabase
    .channel('public:games')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'games' }, async () => {
      refetch();
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'players' }, async () => {
      refetch();
    })
    .subscribe();

  return (
    <>
      {((isLoading || isFetching) && (
        <LottieView autoPlay source={require('../../../assets/loading.json')} />
      )) || (
        <Layout>
          <Stack.Screen
            options={{
              headerShown: true,
              headerTransparent: true,
              headerBackTitleVisible: false,
              headerBackTitle: '',
              title: info.game.name,
            }}
          />
          {(!info.game.started && <NotStartedGame {...info} />) ||
            (!info.game.ended && <StartedGame {...info} />) || <Text>Terminé</Text>}
        </Layout>
      )}
    </>
  );
}
