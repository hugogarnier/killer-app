import React from 'react';
import { View } from 'react-native';

import { useRouter } from 'expo-router';
import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';

import { usePostCreateGame } from '../../../services';
import { useAuthStore } from '../../../stores';
import { Button, Input, KeyboardLayout } from '../../../ui';
import { WomanSit } from '../../../ui/Icons';

export default function Create() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { mutate: mutatePostCreateGame } = usePostCreateGame();

  type Create = { title: string };

  const TitleSchema = Yup.object().shape({
    title: Yup.string()
      .required('le titre doit être entre 4 et 15 caractères')
      .matches(/^[a-zA-Z0-9]{4,15}$/g, 'le titre doit être entre 4 et 15 caractères'),
  });

  const submitCreateForm = async (
    values: { title: string },
    setErrors: (error: FormikErrors<Create>) => void,
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

  return (
    <KeyboardLayout>
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
          <View>
            <View className="items-center pb-32">
              <WomanSit />
            </View>
            <View className="items-center">
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
          </View>
        )}
      </Formik>
    </KeyboardLayout>
  );
}
