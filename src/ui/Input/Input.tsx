import React, { FC } from 'react';
import { TextInput, View } from 'react-native';

import { Text } from '../Text';

type InputProps = {
  variant?: 'primary' | 'secondary';
  placeholder?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  title: string;
  onChangeText?: (text: string) => void;
  value?: string;
  error?: boolean;
  errorMsg?: string;
  type?: 'password';
};

export const Input: FC<InputProps> = ({
  placeholder,
  autoCapitalize = 'none',
  title,
  onChangeText,
  value,
  error,
  errorMsg,
  type,
  ...props
}) => {
  return (
    <View className={'w-full my-2'}>
      <Text className={'text-pure mb-2'}>{title}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        className={'py-2 border-b-[0.5px] border-pure'}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={type === 'password'}
        {...props}
      />
      {error && <Text className={'text-red mt-1'}>{errorMsg}</Text>}
    </View>
  );
};
