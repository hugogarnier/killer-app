import React from 'react';
import { View } from 'react-native';

import { Link, Stack } from 'expo-router';

import { Layout, Text } from '../ui';

export default function NotFoundScreen() {
  return (
    <Layout>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>This screen doesn't exist.</Text>

        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </Layout>
  );
}
