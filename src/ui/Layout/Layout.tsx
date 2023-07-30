import React, { FC, ReactNode } from 'react';
import { Platform, View, ViewStyle } from 'react-native';

type LayoutProps = {
  children: ReactNode | ReactNode[];
  style?: ViewStyle;
};

export const Layout: FC<LayoutProps> = ({ children, style }) => {
  const isAndroid = Platform.OS === 'android';

  return (
    <View
      className={`flex-1 bg-background px-6 pb-8 ${(isAndroid && 'pt-32') || 'pt-24'}`}
      style={style}
    >
      {children}
    </View>
  );
};
