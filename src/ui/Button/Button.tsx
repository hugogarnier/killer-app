import React, { FC } from 'react';
import { Pressable } from 'react-native';

import { Text } from '../Text';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  text: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  text,
  onPress,
  disabled,
  ...props
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`flex flex-row justify-center items-center rounded-xl ${
        (variant === 'primary' && 'bg-pure active:bg-darkBlue') ||
        'bg-backgroundPure border-[0.7px] border-transparent active:border-[0.7px] active:border-pure'
      }  p-5 my-2 w-full`}
      {...props}
    >
      <Text
        className={`${(variant === 'primary' && 'text-white') || 'text-pure'} text-xl text-center`}
      >
        {text}
      </Text>
    </Pressable>
  );
};
