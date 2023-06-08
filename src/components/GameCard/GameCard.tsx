import React, { FC, useState } from 'react';

import { Game, Player } from '../../types';
import { Card } from '../../ui';

type CardGameProps = {
  item: Game;
};

export const GameCard: FC<CardGameProps> = ({ item }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  // const unsubscribe = async () => {
  //   const result = await getPlayersFromCode({ code: item.code });
  //   if (result) setPlayers(result);
  // };

  // useEffect(() => {
  //   if (isFocused) {
  //     unsubscribe();
  //   }
  // }, [isFocused]);

  // const gameStatus =
  //   (item.started && !item.ended && 'started') ||
  //   (item.started && item.ended && 'ended') ||
  //   'notStarted';

  return (
    <Card
      variant={'primary'}
      title={item.name}
      subtitle={`il y a ${players.length} joueurs`}
      // status={gameStatus}
      // onPress={() =>
      //   navigation.navigate(ROUTE.GAME, {
      //     result: item.code,
      //     name: item.name || '',
      //   })
      // }
    />
  );
};
