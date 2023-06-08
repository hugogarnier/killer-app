import React from 'react';
import { Text } from 'react-native';

import { VerifyModal } from '../../../src/components/VerifyModal/VerifyModal';
import { Layout } from '../../../src/ui';

export default function Verify() {
  // const handleOpenEmailboxAsync = async () => {
  //   if (Platform.OS === 'ios') {
  //     try {
  //       await openInbox({
  //         message: 'messageActionSheetiOS',
  //         cancelLabel: 'Cancel',
  //       });
  //     } catch (error) {
  //       console.error(`OpenEmailbox > iOS Error > ${error}`);
  //     }
  //   }

  //   if (Platform.OS === 'android') {
  //     const activityAction = 'android.intent.action.MAIN';
  //     const intentParams: IntentLauncher.IntentLauncherParams = {
  //       category: 'android.intent.category.APP_EMAIL',
  //     };
  //     IntentLauncher.startActivityAsync(activityAction, intentParams);
  //   }
  // };

  return (
    <Layout>
      <Text>Vérifie ton email</Text>
      {/* <Button onPress={handleOpenEmailboxAsync} text="Open email app" />; */}
      <VerifyModal />
    </Layout>
  );
}
