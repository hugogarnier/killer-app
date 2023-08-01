import React from 'react';

import { SimpleLineIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';

import { EndedGame, NotStartedGame, StartedGame } from '../../../components';
import { defaultGame } from '../../../constants';
import { supabase } from '../../../lib';
import { getGame } from '../../../services/functions/games';
import { QUERIES } from '../../../services/types';
import { Layout } from '../../../ui';

function GoBackHome() {
  return (
    <Link href={'/(app)/home/feed'}>
      <SimpleLineIcons name={'arrow-left'} size={18} />
    </Link>
  );
}

export default function Game() {
  const { code } = useLocalSearchParams();

  const { isLoading, isFetching, refetch, data } = useQuery({
    queryKey: [QUERIES.GAME],
    queryFn: () => getGame({ code: code as string }),
  });

  const game = (data && data) || { game: defaultGame, players: [] };

  supabase
    .channel('public:games')
    .on('postgres_changes', { event: '*', schema: 'public' }, async () => {
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
              headerBackTitleStyle: { fontFamily: 'IBMPlexMono_400Regular' },
              headerBackTitle: '',
              headerTitleStyle: { fontFamily: 'IBMPlexMono_400Regular' },
              headerTitleAlign: 'center',
              title: game.game.name,
              headerLeft: GoBackHome,
            }}
          />
          {(!game.game.started && <NotStartedGame {...game} />) ||
            (!game.game.ended && <StartedGame {...game} />) || <EndedGame players={game.players} />}
        </Layout>
      )}
    </>
  );
}
