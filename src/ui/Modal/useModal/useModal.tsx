import { useCallback } from 'react';

import { useBottomSheetModal } from '@gorhom/bottom-sheet';

// * if you don't provide handleChange on Modal props component
// * onOpen, onClose, onChange won't work

export const useModal = (
  arg?:
    | {
        onOpen?: () => void;
        onClose?: () => void;
        onChange?: (fromIndex: number, toIndex: number) => void;
      }
    | undefined,
): {
  handleChange: (fromIndex: number, toIndex: number) => void;
  closeModal: (arg: () => void) => void;
} => {
  const { dismissAll } = useBottomSheetModal();
  const { onChange, onOpen, onClose } = { ...arg };

  const handleAnimate = useCallback((fromIndex: number, toIndex: number) => {
    // * actions when modal index change
    if (onChange) {
      onChange(fromIndex, toIndex);
    }
    // * actions after open modal
    if (fromIndex < 0 && toIndex >= 0 && onOpen) {
      return onOpen();
    }
    // * actions after close modal
    if (toIndex < 0 && onClose) {
      return onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = (action: () => void) => {
    dismissAll();
    if (action) {
      action();
    }
  };

  return { handleChange: handleAnimate, closeModal };
};
