import React, { FC, useCallback, useMemo, useRef } from 'react';
import { Text, View } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

import { Button } from '../../ui';

export const PlayerListModal: FC = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%',
        }}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheetModalProvider>
      <View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
        >
          <View className={'flex-1 items-center px-6 pt-16'}>
            <Text className="text-lg pb-4">confirmation envoyée 🎉</Text>
            <Button text="ouvrir l'app email" />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};
