import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import Container from 'src/components/Container'
import InputField from 'src/components/InputField'
import ErrorField from 'src/components/ErrorField'
import CustomButton from 'src/components/CustomButton'
import { Context } from 'src/providers/UserProvider'
import { register } from 'src/modules/auth/actions'
import { Label } from '../styles'

export default () => {
  const { dispatch } = useContext(Context)

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          register({ dispatch, setSubmitting, values })
        } catch (err) {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, handleSubmit, errors, touched }) => (
        <Container>
          <View>
            <Label>
              <Text>Username</Text>
            </Label>
            <Field
              component={InputField}
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              selectTextOnFocus
            />
            {touched.username && errors.username && (
              <ErrorField>{errors.username}</ErrorField>
            )}
          </View>
          <View>
            <Label>Email</Label>
            <Field
              component={InputField}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              selectTextOnFocus
            />
            {touched.email && errors.email && (
              <ErrorField>{errors.email}</ErrorField>
            )}
          </View>
          <View>
            <Label>Password</Label>
            <Field
              component={InputField}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              selectTextOnFocus
            />
            {touched.password && errors.password && (
              <ErrorField>{errors.password}</ErrorField>
            )}
          </View>
          <CustomButton onPress={handleSubmit} disabled={isSubmitting}>
            Register
          </CustomButton>
        </Container>
      )}
    </Formik>
  )
}
