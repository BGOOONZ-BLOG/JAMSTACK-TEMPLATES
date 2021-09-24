import React from 'react'
import * as Yup from 'yup'
import { Formik, Field } from 'formik'
import { CustomButton, Input, Container, Error } from 'src/components'

export default () => (
  <Container>
    <Formik
      initialStatus={{
        username: '',
        password: '',
        email: '',
        phone_number: '',
      }}
      validationSchema={() => {
        Yup.object().shape({
          username: Yup.string().required('Username required'),
          password: Yup.string().required('Password required'),
          email: Yup.string()
            .email('Invalid email')
            .required('Emai required'),
          phone_number: Yup.string().required('Phone number required'),
        })
      }}
      onSubmit={async values => {
        try {
          // TODO: Sign Up logic
          console.log('user successfully signed up!: ', values)
        } catch (err) {
          console.log('error signing up: ', err)
        }
      }}
      render={({ errors, values, handleSubmit, handleChange }) => (
        <>
          <Field
            component={Input}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
            value={values.username}
            onChangeText={handleChange('username')}
          />
          {errors.username && <Error>{errors.username}</Error>}
          <Field
            component={Input}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
          />
          {errors.password && <Error>{errors.password}</Error>}
          <Field
            component={Input}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            value={values.email}
            onChangeText={handleChange('email')}
          />
          {errors.email && <Error>{errors.email}</Error>}
          <Field
            component={Input}
            placeholder="Phone number"
            autoCapitalize="none"
            autoCorrect={false}
            value={values.phone_number}
            onChangeText={handleChange('phone_number')}
          />
          {errors.phone_number && <Error>{errors.phone_number}</Error>}
          <CustomButton onPress={handleSubmit}>Sign Up</CustomButton>
        </>
      )}
    />
  </Container>
)
