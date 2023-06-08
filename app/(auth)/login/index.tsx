import React from 'react';
import { View } from 'react-native';

import { useRouter } from 'expo-router';
import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';

import { useAuthStore } from '../../../src/store';
import { Button, Input, KeyboardLayout } from '../../../src/ui';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("vérifie la syntaxe de l'email").required('renseigne ton email'),
  password: Yup.string().required('renseigne ton mot de passe'),
});

type SignIn = { email: string; password: string };

export default function Login() {
  const router = useRouter();
  const { login } = useAuthStore();

  const submitForm = async (values: SignIn, setErrors: (error: FormikErrors<SignIn>) => void) => {
    const result = await login(values.email, values.password);

    if (result === 'Invalid login credentials') {
      setErrors({ email: '', password: 'mauvaise combinaison email/mot de passe' });
    }
  };

  return (
    <KeyboardLayout>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setErrors }) => {
          const newValues = { ...values, email: values.email.toLowerCase() };
          submitForm(newValues, (error) => setErrors(error));
        }}
        validationSchema={SignInSchema}
      >
        {({ handleChange, handleSubmit, errors, values, touched }) => (
          <View className="justify-between">
            <Input
              onChangeText={handleChange('email')}
              value={values.email}
              title="email"
              error={touched.email && !!errors.email}
              errorMsg={errors.email}
            />
            <Input
              type="password"
              onChangeText={handleChange('password')}
              value={values.password}
              title="mot de passe"
              error={touched.password && !!errors.password}
              errorMsg={errors.password}
            />
            <Button onPress={handleSubmit} text="se connecter" />
          </View>
        )}
      </Formik>
      <Button variant="secondary" text={"s'enregistrer"} onPress={() => router.push('/register')} />
    </KeyboardLayout>
  );
}
