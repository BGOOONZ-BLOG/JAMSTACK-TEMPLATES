import React from 'react'
import * as Yup from 'yup'
import { Formik, Field } from 'formik'
import { AsyncStorage } from 'react-native'
import { CustomButton, Input, Container, Error } from 'src/components'
import { goHome } from 'src/core/navigation'
import { USER_KEY } from 'src/config'

export default () => (
  <Container>
    <Formik
      initialStatus={{
        username: '',
        password: '',
      }}
      validationSchema={() => {
        Yup.object().shape({
          username: Yup.string().required('Username required'),
          password: Yup.string().required('Password required'),
        })
      }}
      onSubmit={async ({ username }) => {
        try {
          const user = await AsyncStorage.setItem(USER_KEY, username)
          console.log('user successfully signed in!', user)
          goHome()
        } catch (err) {
          console.log('error:', err)
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
          <CustomButton onPress={handleSubmit}>Sign In</CustomButton>
        </>
      )}
    />
  </Container>
)
