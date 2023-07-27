import React from 'react';
import { View } from 'react-native';

import { useRouter } from 'expo-router';
import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';

import { usePostJoinGame } from '../../../services';
import { useAuthStore } from '../../../stores';
import { Button, Input, KeyboardLayout } from '../../../ui';
import { WomanSit } from '../../../ui/Icons';

export default function Join() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { mutate: mutatePostJoinGame } = usePostJoinGame();

  type Join = { code: string };

  const CodeSchema = Yup.object().shape({
    code: Yup.string()
      .required('le code doit faire 5 caractères')
      .matches(/^[0-9A-Z]{5}$/g, 'le code doit être composé de 5 caractères'),
  });

  const submitJoinForm = async (
    values: { code: string },
    setErrors: (error: FormikErrors<Join>) => void,
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
          <View>
            <View className="items-center pb-32">
              <WomanSit />
            </View>
            <View className="items-center">
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
          </View>
        )}
      </Formik>
    </KeyboardLayout>
  );
}
