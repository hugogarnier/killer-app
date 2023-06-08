import React from 'react';
import { View } from 'react-native';

import { useRouter } from 'expo-router';
import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';

import { usePostCreateGame, usePostJoinGame } from '../../../services';
import { useAuthStore } from '../../../stores';
import { Button, Input, KeyboardLayout } from '../../../ui';

export default function CreateJoin() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { mutate: mutatePostCreateGame } = usePostCreateGame();
  const { mutate: mutatePostJoinGame } = usePostJoinGame();

  type CreateJoin = { title: string; code: string };

  const TitleSchema = Yup.object().shape({
    title: Yup.string()
      .required('le titre doit être entre 4 et 15 caractères')
      .matches(/^[a-zA-Z]{4,15}$/g, 'le titre doit être entre 4 et 15 caractères'),
  });

  const CodeSchema = Yup.object().shape({
    code: Yup.string()
      .required('le code doit faire 5 caractères')
      .matches(/^[0-9A-Z]{5}$/g, 'le code doit être composé de 5 lettres majuscules'),
  });

  const submitCreateForm = async (
    values: { title: string },
    setErrors: (error: FormikErrors<Pick<CreateJoin, 'title'>>) => void,
  ) => {
    mutatePostCreateGame(
      { name: values.title, admin: user.id },
      {
        onSuccess: (response) => {
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
          return router.push(`/game/${response.code}`);
        },
        onError: () => {
          setErrors({ code: 'un problème est survenu' });
        },
      },
    );
  };

  return (
    <KeyboardLayout>
      <Formik
        initialValues={{ title: '', code: '' }}
        onSubmit={(values, { setErrors }) => {
          const newValues = { ...values, title: values.title.toLowerCase() };
          submitCreateForm(newValues, (error) => setErrors(error));
        }}
        validationSchema={TitleSchema}
      >
        {({ handleChange, handleSubmit, errors, values, touched }) => (
          <View className="justify-between">
            <Input
              title="titre"
              placeholder="entre un titre"
              onChangeText={handleChange('title')}
              value={values.title}
              error={touched.title && !!errors.title}
              errorMsg={errors.title}
            />
            <Button onPress={handleSubmit} text="créer" />
          </View>
        )}
      </Formik>
      <Formik
        initialValues={{ title: '', code: '' }}
        onSubmit={(values, { setErrors }) => {
          const newValues = { ...values, code: values.code.toLowerCase() };
          submitJoinForm(newValues, (error) => setErrors(error));
        }}
        validationSchema={CodeSchema}
      >
        {({ handleChange, handleSubmit, errors, values, touched }) => (
          <View className="justify-between">
            <Input
              title="code"
              placeholder="enter un code"
              autoCapitalize="characters"
              onChangeText={handleChange('code')}
              value={values.code}
              error={touched.code && !!errors.code}
              errorMsg={errors.code}
            />
            <Button variant="secondary" onPress={handleSubmit} text="rejoindre" />
          </View>
        )}
      </Formik>
    </KeyboardLayout>
  );
}
