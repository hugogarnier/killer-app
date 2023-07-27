import React from 'react';
import { View } from 'react-native';

import { Layout, Text } from '../../../ui';

export default function Index() {
  return (
    <Layout>
      <View className="flex-1 justify-between">
        <View className="justify-center items-center">
          <Text className="text-base">
            {/* Actuellement {games.length} parties sont liées à ton compte */}
            En construction
          </Text>
        </View>
      </View>
    </Layout>
  );
}
