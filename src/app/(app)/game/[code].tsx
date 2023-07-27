import React, { useEffect, useState } from 'react';

import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import LottieView from 'lottie-react-native';

import { EndedGame, NotStartedGame, StartedGame } from '../../../components';
import { defaultGame } from '../../../constants';
import { supabase } from '../../../lib';
import { useGetGame } from '../../../services';
import { GameCreated } from '../../../types';
import { Layout } from '../../../ui';

export default function Game() {
  const { isFocused } = useNavigation();
  const { code } = useLocalSearchParams();
  const [info, setInfo] = useState<GameCreated>({
    game: defaultGame,
    players: [],
  });

  const { isLoading, isFetching, refetch } = useGetGame(
    { code: code as string },
    {
      onSuccess: ({ game, players }) => {
        setInfo({ game, players });
      },
      enabled: false,
    },
  );

  supabase
    .channel('public:games')
    .on('postgres_changes', { event: '*', schema: 'public' }, async () => {
      refetch();
    })
    .subscribe();

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
              headerBackTitleStyle: { fontFamily: 'IBMPlexMono_400Regular' },
              headerBackTitle: '',
              headerTitleStyle: { fontFamily: 'IBMPlexMono_400Regular' },
              title: info.game.name,
            }}
          />
          {(!info.game.started && <NotStartedGame {...info} />) ||
            (!info.game.ended && <StartedGame {...info} />) || <EndedGame players={info.players} />}
        </Layout>
      )}
    </>
  );
}
