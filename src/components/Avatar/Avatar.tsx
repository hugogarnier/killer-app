import React, { FC } from 'react';
import { Image, View } from 'react-native';

type AvatarProps = { uri: string };

export const Avatar: FC<AvatarProps> = ({ uri }) => {
  return (
    <View className="h-28 w-28 rounded-full overflow-hidden border-[1px]">
      <Image source={{ uri }} className="h-full w-full" resizeMode="cover" />
    </View>
  );
};
