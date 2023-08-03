import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../Button';

export type ModalProps = {
  children?: ReactNode | ReactNode[];
  snapPoint?: string;
  snapPointIndex?: number;
  onChange?: (index: number, index2: number) => void;
  onSwipeClose?: () => void;
  onValidate?: () => void;
  onValidateLabel?: string;
};

export const Modal: FC<ModalProps> = ({
  children,
  snapPoint = '45%',
  snapPointIndex = 0,
  onChange,
  onSwipeClose,
  onValidate,
  onValidateLabel,
}) => {
  const { top } = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const snapPoints = useMemo(() => [snapPoint], [snapPoint]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const swipeCloseModalRef = useRef(true);

  // * Used to prevent modal closing when it is just opened, to avoid a total freeze
  const [preventClose, setPreventClose] = useState(true);

  // Auto open modal when isFocused
  useEffect(() => {
    if (isFocused) {
      bottomSheetModalRef.current?.present();
    }
  }, [isFocused]);

  // Auto init swipeCloseModalRef to true when !isFocused
  useEffect(() => {
    if (!isFocused) {
      swipeCloseModalRef.current = true;
    }
  }, [isFocused]);

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        pressBehavior={(preventClose && 'none') || 'close'}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        {...backdropProps}
      />
    ),
    [preventClose],
  );

  const handleChange = useCallback((fromIndex: number, toIndex: number) => {
    // * actions when modal index change
    if (onChange) {
      onChange(fromIndex, toIndex);
    }

    // * actions after close modal
    if (!swipeCloseModalRef.current) {
      swipeCloseModalRef.current = true;
    }

    if (toIndex < 0 && swipeCloseModalRef.current && onSwipeClose) {
      return onSwipeClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePreventClose = (index: number) => {
    if (index >= 0) {
      return setPreventClose(false);
    }
    return setPreventClose(true);
  };

  const handleValidate = () => {
    swipeCloseModalRef.current = false;
    if (onValidate) {
      onValidate();
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={snapPointIndex}
      onAnimate={handleChange}
      onChange={updatePreventClose}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}
      topInset={top}
    >
      {children}
      {onValidate && (
        <View className="px-6">
          <Button onPress={handleValidate} text={onValidateLabel} />
        </View>
      )}
    </BottomSheetModal>
  );
};
