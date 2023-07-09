import React, { FC, useState } from 'react';

import { useRouter } from 'expo-router';

import { useGetPlayersFromCode } from '../../services';
import { Game, Player } from '../../types';
import { Card } from '../../ui';

type CardGameProps = {
  item: Game;
};

export const GameCard: FC<CardGameProps> = ({ item }) => {
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);

  useGetPlayersFromCode(
    { code: item.code },
    {
      onSuccess: (response: Player[]) => {
        setPlayers(response);
      },
    },
  );

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
