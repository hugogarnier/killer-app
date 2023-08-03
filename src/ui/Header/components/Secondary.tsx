import React, { FC } from 'react';

import { Link } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { colors } from '../../../constants';

type SecondaryProps = {};

export const Secondary: FC<SecondaryProps> = () => {
  return (
    <Link href={'/home/feed'}>
      <ChevronLeft size={24} color={colors.gray800} />
    </Link>
  );
};
