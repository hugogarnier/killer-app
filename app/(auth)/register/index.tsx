import React from 'react';
import { View } from 'react-native';

import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';

import { useAuthStore } from '../../../src/store';
import { Button, Input, KeyboardLayout } from '../../../src/ui';

const passwordRegex =
  /(?=[A-Za-z0-9@#$%^+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[@#$%^+!=])(?=.{6,}).*$/;
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("vérifie la syntaxe de l'email").required('renseigne ton email'),
  password: Yup.string()
    .required('renseigne ton mot de passe')
    .matches(passwordRegex, 'mot de passe trop faible'),
});

type Register = { pseudo: string; email: string; password: string };

export default function Register() {
  const { register } = useAuthStore();

  const submitForm = async (
    values: Register,
    setErrors: (error: FormikErrors<Register>) => void,
  ) => {
    const result = await register(values.pseudo, values.email, values.password);

    if (result === 400) {
      setErrors({ email: 'utilisateur déjà enregistré', password: '' });
    }
    if (result === 209) {
      setErrors({ pseudo: 'pseudo déjà utilisé', email: '', password: '' });
    }
    // setOpenModal(true);
  };

  return (
    <KeyboardLayout>
      <Formik
        // initialValues={{ pseudo: '', email: '', password: '' }}
        initialValues={{
          pseudo: 'totohe',
          email: 'hugo.garnier0@gmail.com',
          password: 'Azerty1!',
        }}
        onSubmit={(values, { setErrors }) => {
          const newValues = { ...values, email: values.email.toLowerCase() };
          submitForm(newValues, (error) => setErrors(error));
        }}
        validationSchema={RegisterSchema}
      >
        {({ handleChange, handleSubmit, errors, values, touched }) => (
          <View>
            <Input
              onChangeText={handleChange('pseudo')}
              value={values.pseudo}
              title="pseudo"
              error={touched.pseudo && !!errors.pseudo}
              errorMsg={errors.pseudo}
            />
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
            <Button
              onPress={handleSubmit}
              text="valider"
              disabled={
                (touched.password && !!errors.password) || (touched.email && !!errors.email)
              }
            />
          </View>
        )}
      </Formik>
    </KeyboardLayout>
  );
}
