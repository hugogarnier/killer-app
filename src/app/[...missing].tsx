import React from 'react';
import { View } from 'react-native';

import { Link, Stack } from 'expo-router';

import { Layout, Text } from '../ui';

export default function NotFoundScreen() {
  return (
    <Layout>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>Cet écran n'existe pas</Text>

        <Link href="/">
          <Text>Retour sur la page de connexion</Text>
        </Link>
      </View>
    </Layout>
  );
}
