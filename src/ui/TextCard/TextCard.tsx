import React, { FC } from 'react';
import { Pressable, View } from 'react-native';

import { RadioButton } from '../Icons';
import { Text } from '../Text/Text';

type TextCardProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  status?: boolean;
  title: string;
  onPress?: () => void;
};
export const TextCard: FC<TextCardProps> = ({ variant, status = true, title, onPress }) => {
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
          <RadioButton color={`${(!status && '#DB9E43') || (status && '#4CB9A3') || '#E44646'}`} />
        </View>
      )}
      {variant === 'tertiary' && (
        <View>
          <RadioButton color={`${(!status && '#DB9E43') || (status && '#4CB9A3') || '#E44646'}`} />
        </View>
      )}
    </Pressable>
  );
};
