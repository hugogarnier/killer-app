import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { Platform, Text, View } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import * as IntentLauncher from 'expo-intent-launcher';
import { openInbox } from 'react-native-email-link';

import { Button } from '../../ui';

export const VerifyModal: FC = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);

  // useEffect(() => {
  //   bottomSheetModalRef.current?.present();
  // }, []);

  const handleOpenEmailboxAsync = async () => {
    if (Platform.OS === 'ios') {
      try {
        await openInbox({
          message: 'messageActionSheetiOS',
          cancelLabel: 'Cancel',
        });
      } catch (error) {
        console.error(`OpenEmailbox > iOS Error > ${error}`);
      }
    }

    if (Platform.OS === 'android') {
      const activityAction = 'android.intent.action.MAIN';
      const intentParams: IntentLauncher.IntentLauncherParams = {
        category: 'android.intent.category.APP_EMAIL',
      };
      IntentLauncher.startActivityAsync(activityAction, intentParams);
    }
  };

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
            <Button onPress={handleOpenEmailboxAsync} text="ouvrir l'app email" />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};
