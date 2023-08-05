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

import { usePostCreateGame } from '../../../services';
import { Button, Input, KeyboardLayout } from '../../../ui';

export default function Create() {
  const router = useRouter();
  const { user } = useAuth0();
  const { mutate: mutatePostCreateGame } = usePostCreateGame();
  const { top } = useSafeAreaInsets();
  const [gameCreated, setGameCreated] = useState<boolean>(false);

  const snapPoints = useMemo(() => ['45%'], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Auto open modal when isFocused
  useFocusEffect(() => {
    bottomSheetModalRef.current?.present();
  });

  const validationSchema = z.object({
    create: z
      .string()
      .regex(/^[a-zA-Z0-9_ ]{4,16}$/g, 'le titre doit être entre 4 et 16 caractères'),
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
      create: '',
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: ValidationSchema) => {
    if (user) {
      mutatePostCreateGame(
        { name: data.create, admin: user.sub },
        {
          onSuccess: (response) => {
            if (response.status === 400 && !!response.message)
              return setError('create', { type: 'custom', message: response.message });
            setGameCreated(true);
            bottomSheetModalRef.current?.dismiss();
            return router.push(`/game/${response.code}`);
          },
          onError: () => {
            return setError('create', { type: 'custom', message: 'un problème est survenu' });
          },
        },
      );
    } else {
      setError('create', { type: 'custom', message: 'il y a un problème avec ton id utilisateur' });
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
      if (gameCreated) {
        return undefined;
      }
      if (index < 0 && !gameCreated) {
        return router.back();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameCreated],
  );

  return (
    <Controller
      name="create"
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
                  title="titre"
                  placeholder="entre un titre"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={!!errors}
                  errorMsg={errors.create?.message}
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
