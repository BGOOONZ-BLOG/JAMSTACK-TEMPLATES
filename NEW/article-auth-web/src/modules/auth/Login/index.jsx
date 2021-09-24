import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Container from 'components/common/Container'
import InputField from 'components/common/InputField'
import ErrorField from 'components/common/ErrorField'
import Button from 'components/common/Button'
import { Context } from 'providers/UserProvider'
import Spinner from 'react-spinkit'
import { Wrapper, Center } from './styles'
import { login } from '../actions'

export default () => {
  const { dispatch } = useContext(Context)

  return (
    <Container>
      <Wrapper>
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
          {({ isSubmitting, handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <InputField label="Email" error={errors.email && touched.email}>
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage component={ErrorField} name="email" />
              </InputField>
              <InputField
                label="Password"
                error={errors.password && touched.password}
              >
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage component={ErrorField} name="password" />
              </InputField>
              <Center>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Spinner name="circle" color="white" />
                  ) : (
                    <span>Login</span>
                  )}
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  )
}
