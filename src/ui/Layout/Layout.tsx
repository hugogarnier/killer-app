import React, { FC, ReactNode } from 'react';
import { Platform, View, ViewStyle } from 'react-native';

type LayoutProps = {
  children: ReactNode | ReactNode[];
  style?: ViewStyle;
  className?: string;
};

export const Layout: FC<LayoutProps> = ({ children, className, style }) => {
  const isAndroid = Platform.OS === 'android';

  return (
    <View
      className={`flex-1 bg-background px-6 pb-8 ${(isAndroid && 'pt-28') || 'pt-24'} ${className}`}
      style={style}
    >
      {children}
    </View>
  );
};
