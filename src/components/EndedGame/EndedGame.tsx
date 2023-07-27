import React, { FC } from 'react';
import { View } from 'react-native';

import { Player } from '../../types';
import { Layout, Text, TextCard } from '../../ui';

type EndedGameProps = {
  players: Player[];
};

export const EndedGame: FC<EndedGameProps> = ({ players }) => {
  return (
    <Layout>
      <View className="space-y-10">
        <Text className="text-center text-xl">Partie terminée</Text>
        <View className="space-y-12">
          <Text className="pb-4">Vainqueur</Text>
          <TextCard variant="secondary" title={players[0].player_name} />
        </View>
      </View>
    </Layout>
  );
};
