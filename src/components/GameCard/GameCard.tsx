import React, { FC } from 'react';

import { useRouter } from 'expo-router';

import { Game } from '../../types';
import { Card } from '../../ui';

type CardGameProps = {
  item: Game;
};

export const GameCard: FC<CardGameProps> = ({ item }) => {
  const router = useRouter();

  const gameStatus =
    (item.started && !item.ended && 'started') ||
    (item.started && item.ended && 'ended') ||
    'notStarted';

  return (
    <Card
      variant={'primary'}
      title={item.name}
      subtitle={`code de la partie ${item.code}`}
      status={gameStatus}
      onPress={() => router.push(`/game/${item.code}`)}
    />
  );
};
