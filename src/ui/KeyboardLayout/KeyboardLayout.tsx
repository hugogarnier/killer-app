import React, { FC, ReactNode } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type KeyboardLayoutProps = {
  children: ReactNode | ReactNode[];
};

export const KeyboardLayout: FC<KeyboardLayoutProps> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={'flex-1 bg-background px-6 pt-24 '}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-between pb-8">{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
