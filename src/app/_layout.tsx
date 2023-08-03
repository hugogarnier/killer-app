import React from 'react';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// eslint-disable-next-line import/no-named-as-default
import Constants from 'expo-constants';
import { Slot } from 'expo-router';
import { Auth0Provider } from 'react-native-auth0';

import { useAppInit } from '../hooks';

export default function Root() {
  const queryClient = new QueryClient();

  useAppInit();

  const AUTH_DOMAIN = Constants.expoConfig?.extra?.AUTH_DOMAIN;
  const AUTH_CLIENT_ID = Constants.expoConfig?.extra?.AUTH_CLIENT_ID;

  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider domain={AUTH_DOMAIN} clientId={AUTH_CLIENT_ID}>
        <BottomSheetModalProvider>
          <Slot />
        </BottomSheetModalProvider>
      </Auth0Provider>
    </QueryClientProvider>
  );
}
