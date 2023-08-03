import React, { FC } from 'react';
import { View } from 'react-native';

import { Link } from 'expo-router';
import { PenSquare, User, UserPlus2 } from 'lucide-react-native';

import { colors } from '../../../constants';

type PrimaryProps = {};

export const Primary: FC<PrimaryProps> = () => {
  return (
    <>
      <Link href={'/home/profile'} className="p-2 bg-background rounded-full active:bg-white">
        <User color={colors.gray800} size={24} />
      </Link>
      <View className="flex flex-row space-x-3">
        <Link href="/home/create" className="p-2 bg-pure rounded-full active:bg-darkBlue">
          <PenSquare color={colors.background} size={24} className="" />
        </Link>
        <Link href="/home/join" className="p-2 bg-backgroundPure rounded-full active:bg-white">
          <UserPlus2 color={colors.pure} size={24} />
        </Link>
      </View>
    </>
  );
};
