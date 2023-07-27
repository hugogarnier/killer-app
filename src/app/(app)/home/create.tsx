import React from 'react';
import { View } from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { usePostCreateGame } from '../../../services';
import { useAuthStore } from '../../../stores';
import { Button, Input, KeyboardLayout } from '../../../ui';
import { WomanSit } from '../../../ui/Icons';

export default function Create() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { mutate: mutatePostCreateGame } = usePostCreateGame();

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
        { name: data.create, admin: user.id },
        {
          onSuccess: (response) => {
            if (response.status === 400 && !!response.message)
              return setError('create', { type: 'custom', message: response.message });
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

  return (
    <KeyboardLayout>
      <Controller
        name="create"
        control={control}
        rules={{ required: true, max: 16 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <View className="items-center pb-32">
              <WomanSit />
            </View>
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
              <Button onPress={handleSubmit(onSubmit)} text="créer" />
            </View>
          </View>
        )}
      />
    </KeyboardLayout>
  );
}
