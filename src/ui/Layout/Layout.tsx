import React, { FC, ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

type LayoutProps = {
  children: ReactNode | ReactNode[];
  style?: ViewStyle;
};

export const Layout: FC<LayoutProps> = ({ children, style }) => {
  return (
    <View className={'flex-1 bg-background px-6 pt-16'} style={style}>
      {children}
    </View>
  );
};
