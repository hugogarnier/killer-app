import React from 'react';
import { View } from 'react-native';

import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Stack, useFocusEffect } from 'expo-router';

import { GameCard } from '../../../components';
import { defaultUser } from '../../../constants';
import { getFilteredGames } from '../../../services/functions/games';
import { QUERIES } from '../../../services/types';
import { useAuthStore, useGameStore } from '../../../stores';
import { Game } from '../../../types';
import { Header, Layout, Text } from '../../../ui';
import { WomanComputer } from '../../../ui/Icons';

const HeaderScreen = () => <Header variant="primary" />;
const Separator = () => <View className={'h-8'} />;

export default function Feed() {
  const user = useAuthStore((state) => state.user);
  const setGames = useGameStore((state) => state.setGames);
  const games = useGameStore((state) => state.games);

  const userExists = (user && user) || defaultUser;

  const { isLoading, refetch, data, isSuccess } = useQuery({
    queryKey: [QUERIES.GAMES],
    queryFn: () => getFilteredGames({ id: userExists.id }),
    enabled: false,
  });

  useFocusEffect(() => {
    refetch();

    if (data && isSuccess) {
      setGames({ games: data });
    }
  });

  const renderItem = ({ item }: { item: Game }) => <GameCard item={item} />;

  return (
    <Layout>
      <Stack.Screen
        options={{
          header: HeaderScreen,
        }}
      />
      <View className={'w-full h-full'}>
        {(!games.length && (
          <View className={'flex-1 flex-col justify-around items-center'}>
            <Text className={'text-center'}>Tu n&apos;as pas encore créé ou rejoins de partie</Text>
            <WomanComputer height={200} width={200} />
          </View>
        )) || (
          <FlashList
            data={games}
            onRefresh={refetch}
            refreshing={isLoading}
            renderItem={renderItem}
            estimatedItemSize={200}
            ItemSeparatorComponent={Separator}
          />
        )}
      </View>
    </Layout>
  );
}
