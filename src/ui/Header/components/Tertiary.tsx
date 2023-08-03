import React, { FC } from 'react';
import { Pressable } from 'react-native';

import { Link } from 'expo-router';
import { ChevronLeft, Share } from 'lucide-react-native';

import { colors } from '../../../constants';
import { Text } from '../../Text';

type TertiaryProps = {
  title?: string;
  onPress?: () => void;
};

export const Tertiary: FC<TertiaryProps> = ({ title, onPress }) => {
  return (
    <>
      <Link href={'/home/feed'}>
        <ChevronLeft size={24} color={colors.gray800} />
      </Link>
      <Text className="font-ibmReg text-lg">{title}</Text>
      <Pressable onPress={onPress} className="p-2 bg-pure rounded-full active:bg-darkBlue">
        <Share color={colors.background} size={24} />
      </Pressable>
    </>
  );
};
