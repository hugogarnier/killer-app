import React, { useState } from 'react';
import { Text } from 'react-native';

import { Stack, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';

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

  const { isLoading, refetch } = useGetGame(
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
      {(isLoading && <LottieView autoPlay source={require('../../../assets/loading.json')} />) || (
        <Layout>
          <Stack.Screen options={{ headerShown: true, title: info.game.name }} />
          {(!info.game.started && <Text>Pas démarré</Text>) ||
            (!info.game.ended && <Text>En cours</Text>) || <Text>Terminé</Text>}
        </Layout>
      )}
    </>
  );
}
