import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';

import { EndedGame, NotStartedGame, StartedGame } from '../../../components';
import { defaultGame } from '../../../constants';
import { supabase } from '../../../lib';
import { getGame } from '../../../services/functions/games';
import { QUERIES } from '../../../services/types';
import { GameCreated } from '../../../types';
import { Header, Layout } from '../../../ui';
import { shareCode } from '../../../utils';

const HeaderScreen = ({ game }: { game: GameCreated }) => (
  <Header variant="tertiary" title={game.game.name} onPress={() => shareCode(game.game.code)} />
);

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
              // eslint-disable-next-line react/no-unstable-nested-components
              header: () => <HeaderScreen game={game} />,
            }}
          />
          {(!game.game.started && <NotStartedGame {...game} />) ||
            (!game.game.ended && <StartedGame {...game} />) || <EndedGame players={game.players} />}
        </Layout>
      )}
    </>
  );
}
