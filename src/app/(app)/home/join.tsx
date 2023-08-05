import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useAuth0 } from 'react-native-auth0';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { usePostJoinGame } from '../../../services';
import { Button, Input, KeyboardLayout } from '../../../ui';

export default function Join() {
  const router = useRouter();
  const { user } = useAuth0();
  const { mutate: mutatePostJoinGame } = usePostJoinGame();
  const { top } = useSafeAreaInsets();
  const [gameJoined, setGameJoined] = useState<boolean>(false);

  const snapPoints = useMemo(() => ['45%'], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Auto open modal when isFocused
  useFocusEffect(() => {
    bottomSheetModalRef.current?.present();
  });

  const validationSchema = z.object({
    code: z
      .string()
      .regex(/^[0-9A-Z]{5}$/g, 'le code doit être composé de 5 caractères majuscules'),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ValidationSchema>({
    mode: 'onTouched',
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: ValidationSchema) => {
    if (user) {
      mutatePostJoinGame(
        { code: data.code, user },
        {
          onSuccess: (response) => {
            if (response.status === 400 && !!response.message) {
              return setError('code', { type: 'custom', message: response.message });
            }
            setGameJoined(true);
            return router.push(`/game/${response.code}`);
          },
          onError: () => {
            return setError('code', { type: 'custom', message: 'un problème est survenu' });
          },
        },
      );
    } else {
      setError('code', { type: 'custom', message: 'il y a un problème avec ton id utilisateur' });
    }
  };

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        {...backdropProps}
      />
    ),
    [],
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (gameJoined) {
        return undefined;
      }
      if (index < 0 && !gameJoined) {
        return router.back();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameJoined],
  );

  return (
    <Controller
      name="code"
      control={control}
      rules={{ required: true, max: 16 }}
      render={({ field: { onChange, onBlur, value } }) => (
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          topInset={top}
        >
          <KeyboardLayout>
            <View>
              <View className="items-center">
                <Input
                  title="code"
                  placeholder="entre un code"
                  autoCapitalize="characters"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors}
                  errorMsg={errors.code?.message}
                />
              </View>
              <View className="px-6">
                <Button onPress={handleSubmit(onSubmit)} text={'valider'} />
              </View>
            </View>
          </KeyboardLayout>
        </BottomSheetModal>
      )}
    />
  );
}
