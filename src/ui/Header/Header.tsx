import React, { FC } from 'react';
import { Platform, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Primary } from './components/Primary';
import { Secondary } from './components/Secondary';
import { Tertiary } from './components/Tertiary';

type HeaderProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  title?: string;
  onPress?: () => void;
};

export const Header: FC<HeaderProps> = ({ variant = 'primary', title, onPress }) => {
  const { top } = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';

  return (
    <View
      className={`flex flex-row justify-between items-center w-full px-6 pb-4 overflow-hidden ${
        (isAndroid && top && 'pt-14') || 'pt-10'
      }`}
    >
      {variant === 'primary' && <Primary />}
      {variant === 'secondary' && <Secondary />}
      {variant === 'tertiary' && <Tertiary title={title} onPress={onPress} />}
    </View>
  );
};
