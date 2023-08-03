import React, { FC } from 'react';
import { Platform, View } from 'react-native';

import { Primary } from './components/Primary';
import { Secondary } from './components/Secondary';
import { Tertiary } from './components/Tertiary';

type HeaderProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  title?: string;
  onPress?: () => void;
};

export const Header: FC<HeaderProps> = ({ variant = 'primary', title, onPress }) => {
  const isAndroid = Platform.OS === 'android';

  return (
    <View
      className={`flex flex-row justify-between items-center w-full px-6 ${
        (isAndroid && 'pt-10') || 'pt-8'
      }`}
    >
      {variant === 'primary' && <Primary />}
      {variant === 'secondary' && <Secondary />}
      {variant === 'tertiary' && <Tertiary title={title} onPress={onPress} />}
    </View>
  );
};
