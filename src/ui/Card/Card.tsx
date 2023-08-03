import React, { FC } from 'react';
import { Pressable, View } from 'react-native';

import { colors } from '../../constants';
import { Brightness, Chevron, Close, RadioButton, Settings } from '../Icons';
import { Text } from '../Text';

type CardProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  status?: 'notStarted' | 'started' | 'ended';
  title: string;
  subtitle?: string;
  onPress?: () => void;
};
export const Card: FC<CardProps> = ({
  variant,
  status = 'notStarted',
  title,
  subtitle,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`flex flex-row justify-between items-center w-full h-20 bg-white px-4 py-4 rounded-xl active:scale-95`}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      {variant === 'primary' && (
        <View className={'flex flex-row justify-between items-center'}>
          <View className={'bg-backgroundPure p-4 rounded-full'}>
            {(status === 'notStarted' && <Settings color={colors.pure} height={30} width={30} />) ||
              (status === 'started' && <Brightness color={colors.pure} height={30} width={30} />) ||
              (status === 'ended' && <Close color={colors.pure} height={30} width={30} />)}
          </View>

          <View className={'pl-5'}>
            <Text className={'text-xl font-title'}>{title}</Text>
            {subtitle && <Text className={'text-gray400'}>{subtitle}</Text>}
          </View>
        </View>
      )}

      {variant === 'secondary' && (
        <View className={'ml-5'}>
          <Text className={'text-xl font-bold'}>{title}</Text>
          {subtitle && <Text className={'text-gray400'}>{subtitle}</Text>}
        </View>
      )}

      {(variant === 'primary' || variant === 'secondary') && (
        <View>
          {(variant === 'secondary' && <Chevron />) || (
            <RadioButton
              color={`${
                (status === 'notStarted' && colors.orange) ||
                (status === 'started' && colors.green) ||
                colors.red
              }`}
            />
          )}
        </View>
      )}
    </Pressable>
  );
};
