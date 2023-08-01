import React from 'react';
import { View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { usePostJoinGame } from '../../../services';
import { useAuthStore } from '../../../stores';
import { Button, Input, KeyboardLayout } from '../../../ui';
import { WomanSit } from '../../../ui/Icons';

export default function Join() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { mutate: mutatePostJoinGame } = usePostJoinGame();

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

  return (
    <KeyboardLayout>
      <Controller
        name="code"
        control={control}
        rules={{ required: true, maxLength: 5 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <View className="items-center pb-32">
              <WomanSit />
            </View>
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
              <Button onPress={handleSubmit(onSubmit)} text="rejoindre" />
            </View>
          </View>
        )}
      />
    </KeyboardLayout>
  );
}
