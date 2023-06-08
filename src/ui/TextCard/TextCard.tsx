import React, { FC } from 'react';
import { Pressable, Text, View } from 'react-native';

import { RadioButton } from '../Icons';

type TextCardProps = {
  variant: 'primary' | 'secondary';
  status?: 'alive' | 'dead';
  title: string;
  onPress?: () => void;
};
export const TextCard: FC<TextCardProps> = ({ variant, status = 'alive', title, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`flex flex-row ${
        (variant === 'secondary' && 'justify-center') || 'justify-between'
      } items-center w-full bg-white px-4 py-3 rounded-xl`}
    >
      <Text className={'text-lg'}>{title}</Text>

      {variant === 'primary' && (
        <View>
          <RadioButton
            color={`${
              (status === 'dead' && '#DB9E43') || (status === 'alive' && '#4CB9A3') || '#E44646'
            }`}
          />
        </View>
      )}
    </Pressable>
  );
};
