import React from 'react';
import { View } from 'react-native';

import { useRouter } from 'expo-router';
import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';

import { usePostCreateGame, usePostJoinGame } from '../../../services';
import { useAuthStore } from '../../../stores';
import { Button, Input, KeyboardLayout } from '../../../ui';
import { WomanSit } from '../../../ui/Icons';

export default function CreateJoin() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { mutate: mutatePostCreateGame } = usePostCreateGame();
  const { mutate: mutatePostJoinGame } = usePostJoinGame();

  type CreateJoin = { title: string; code: string };

  const TitleSchema = Yup.object().shape({
    title: Yup.string()
      .required('le titre doit être entre 4 et 15 caractères')
      .matches(/^[a-zA-Z0-9]{4,15}$/g, 'le titre doit être entre 4 et 15 caractères'),
  });

  const CodeSchema = Yup.object().shape({
    code: Yup.string()
      .required('le code doit faire 5 caractères')
      .matches(/^[0-9A-Z]{5}$/g, 'le code doit être composé de 5 caractères'),
  });

  const submitCreateForm = async (
    values: { title: string },
    setErrors: (error: FormikErrors<Pick<CreateJoin, 'title'>>) => void,
  ) => {
    mutatePostCreateGame(
      { name: values.title, admin: user.id },
      {
        onSuccess: (response) => {
          if (response.status === 400) return setErrors({ title: 'le nom existe déjà' });
          return router.push(`/game/${response.code}`);
        },
        onError: () => {
          setErrors({ title: 'un problème est survenu' });
        },
      },
    );
  };

  const submitJoinForm = async (
    values: { code: string },
    setErrors: (error: FormikErrors<Pick<CreateJoin, 'code'>>) => void,
  ) => {
    mutatePostJoinGame(
      { user: user, code: values.code },
      {
        onSuccess: (response) => {
          if (response.status === 400) return setErrors({ code: 'vous êtes déjà dans la partie' });
          return router.push(`/game/${values.code.toUpperCase()}`);
        },
        onError: () => {
          setErrors({ code: 'un problème est survenu' });
        },
      },
    );
  };

  return (
    <KeyboardLayout>
      <View className="justify-center items-center">
        <WomanSit />
      </View>
      <Formik
        initialValues={{ title: '' }}
        onSubmit={(values, { setErrors, resetForm }) => {
          const newValues = { ...values, title: values.title.toLowerCase() };
          submitCreateForm(newValues, (error) => setErrors(error));
          resetForm({ values: { title: '' } });
        }}
        validationSchema={TitleSchema}
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <View className="justify-between">
            <Input
              title="titre"
              placeholder="entre un titre"
              onChangeText={handleChange('title')}
              value={values.title}
              error={!!errors.title}
              errorMsg={errors.title}
            />
            <Button onPress={handleSubmit} text="créer" />
          </View>
        )}
      </Formik>
      <Formik
        initialValues={{ code: '' }}
        onSubmit={(values, { setErrors, resetForm }) => {
          const newValues = { ...values, code: values.code.toLowerCase() };
          submitJoinForm(newValues, (error) => setErrors(error));
          resetForm({ values: { code: '' } });
        }}
        validationSchema={CodeSchema}
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <View className="justify-between">
            <Input
              title="code"
              placeholder="enter un code"
              autoCapitalize="characters"
              onChangeText={handleChange('code')}
              value={values.code}
              error={!!errors.code}
              errorMsg={errors.code}
            />
            <Button variant="secondary" onPress={handleSubmit} text="rejoindre" />
          </View>
        )}
      </Formik>
    </KeyboardLayout>
  );
}
