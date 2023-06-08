import React from 'react';
import { Text, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { GameCard } from '../../../src/components';
import { defaultGame } from '../../../src/constants';
import { Game } from '../../../src/types';
import { Layout } from '../../../src/ui';
import { WomanComputer } from '../../../src/ui/Icons';

export default function Feed() {
  const renderItem = ({ item }: { item: Game }) => <GameCard item={item} />;

  return (
    <Layout>
      <View className={'w-full h-full'}>
        {(![defaultGame].length && (
          <View className={'flex-1 flex-col justify-around items-center'}>
            <Text className={'text-center'}>
              Tu n&apos;as pas encore créé ou rejoins une partie
            </Text>
            <WomanComputer height={200} width={200} />
          </View>
        )) || (
          <FlashList
            data={[defaultGame]}
            onRefresh={() => console.log('first')}
            refreshing={false}
            renderItem={renderItem}
            estimatedItemSize={200}
          />
        )}
      </View>
    </Layout>
  );
}
