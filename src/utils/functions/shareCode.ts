import { Share } from 'react-native';

import { Game } from '../../types';

export const shareCode = async (code: Game['code']) => {
  try {
    const result = await Share.share({
      message: code,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      }
    }
    if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // console.log(error.message);
  }
};
