import React from 'react';
import { Text, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { GameCard } from '../../../components';
import { useGetFilteredGames } from '../../../services';
import { useAuthStore, useGameStore } from '../../../stores';
import { Game } from '../../../types';
import { Layout } from '../../../ui';
import { WomanComputer } from '../../../ui/Icons';

const Separator = () => <View className={'h-8'} />;

export default function Feed() {
  // const { logout } = useAuthStore();
  // logout();
  const user = useAuthStore((state) => state.user);
  const setGames = useGameStore((state) => state.setGames);
  const games = useGameStore((state) => state.games);

  const { isLoading, refetch } = useGetFilteredGames(
    { id: user.id },
    {
      onSuccess: (response: Game[]) => {
        setGames({ games: response });
      },
    },
  );

  const renderItem = ({ item }: { item: Game }) => <GameCard item={item} />;

  return (
    <Layout>
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
