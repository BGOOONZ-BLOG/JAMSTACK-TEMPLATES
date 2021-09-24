import React, { useContext } from 'react'
import { View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Context } from 'src/providers/UserProvider'
import { login } from 'src/modules/auth/actions'
import Container from 'src/components/Container'
import InputField from 'src/components/InputField'
import ErrorField from 'src/components/ErrorField'
import CustomButton from 'src/components/CustomButton'
import DismissibleKeyboardView from 'src/components/DismissibleKeyboardView'
import { Label } from '../styles'

export default () => {
  const { dispatch } = useContext(Context)

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
        password: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          login({ dispatch, setErrors, setSubmitting, values })
        } catch (err) {
          setSubmitting(false)
        }
      }}
    >
      {({
        isSubmitting,
        handleSubmit,
        errors,
        touched,
        values,
        handleChange,
        handleBlur,
      }) => (
        <Container>
          <DismissibleKeyboardView keyboardShouldPersistTaps="handled">
            <View>
              <Label>Email</Label>
              <InputField
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
              <InputField
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                selectTextOnFocus
                secureTextEntry
              />
              {touched.password && errors.password && (
                <ErrorField>{errors.password}</ErrorField>
              )}
            </View>
            <CustomButton onPress={handleSubmit} disabled={isSubmitting}>
              Login
            </CustomButton>
          </DismissibleKeyboardView>
        </Container>
      )}
    </Formik>
  )
}
