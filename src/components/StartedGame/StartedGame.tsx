import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { defaultPlayer } from '../../constants';
import { usePostKillPlayer } from '../../services';
import { useAuthStore } from '../../stores';
import { Game, Player } from '../../types';
import { Button, Layout, TextCard } from '../../ui';

type StartedGameProps = {
  game: Game;
  players: Player[];
};

export const StartedGame: FC<StartedGameProps> = ({ game, players }) => {
  const { user } = useAuthStore();
  const { mutate } = usePostKillPlayer();

  const currentPlayer = players.find((player) => player.player_id === user.id) || defaultPlayer;
  const playerToKillName =
    players.find((player) => player.player_id === currentPlayer.player_to_kill) || defaultPlayer;

  const handleKill = () => {
    mutate(
      { code: game.code, uid: currentPlayer.player_id },
      {
        onSuccess: () => {
          // toast ??
        },
      },
    );
  };

  return (
    <Layout>
      <View className="flex-1 justify-between pb-16">
        <View className="flex-row justify-center items-center space-x-4">
          <Text className="text-xl font-bold">{game.code}</Text>
        </View>
        <View className="space-y-12">
          <Text className="pb-4">Tu dois tuer</Text>
          <TextCard variant="secondary" title={playerToKillName.player_name} />

          <Text className="pb-4">Avec cette action</Text>
          <TextCard variant="secondary" title={currentPlayer.action} />
        </View>

        <View className="items-center">
          <Button onPress={handleKill} text={'KILL'} />
        </View>
      </View>
    </Layout>
  );
};
