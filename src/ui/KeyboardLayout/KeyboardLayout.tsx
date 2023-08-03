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
      className={'px-6'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
