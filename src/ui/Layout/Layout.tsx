import React, { FC, ReactNode } from 'react';
import { Platform, View, ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

type LayoutProps = {
  children: ReactNode | ReactNode[];
  style?: ViewStyle;
};

export const Layout: FC<LayoutProps> = ({ children, style }) => {
  const isAndroid = Platform.OS === 'android';
  const { top } = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-background px-6 pb-8 ${(isAndroid && !top && 'pt-32') || 'pt-24'}`}
      style={style}
    >
      {children}
    </View>
  );
};
