import React, { FC, useEffect, useState } from 'react';

import { useNavigation, useRouter } from 'expo-router';

import { useGetPlayersFromCode } from '../../services';
import { Game, Player } from '../../types';
import { Card } from '../../ui';

type CardGameProps = {
  item: Game;
};

export const GameCard: FC<CardGameProps> = ({ item }) => {
  const router = useRouter();
  const { isFocused } = useNavigation();
  const [players, setPlayers] = useState<Player[]>([]);

  const { refetch } = useGetPlayersFromCode(
    { code: item.code },
    {
      onSuccess: (response: Player[]) => {
        setPlayers(response);
      },
    },
  );

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const gameStatus =
    (item.started && !item.ended && 'started') ||
    (item.started && item.ended && 'ended') ||
    'notStarted';

  return (
    <Card
      variant={'primary'}
      title={item.name}
      subtitle={`il y a ${players.length} joueurs`}
      status={gameStatus}
      onPress={() => router.push(`/game/${item.code}`)}
    />
  );
};
