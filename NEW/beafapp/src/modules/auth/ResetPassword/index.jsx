import React from 'react'
import Spinner from 'react-spinkit'
import { connect } from 'react-redux'
import { compose, withState, lifecycle } from 'recompose'
import * as Yup from 'yup'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import { resetPassword } from '../actions'
import {
  Container,
  Button,
  InputField,
  Error,
  SEO,
  Loading,
} from '../../../components/common'
import { Card, Center, Show, Wrapper } from '../styles'

const ResetPassword = ({
  errors,
  touched,
  isSubmitting,
  showPassword,
  visible,
  values,
  loading,
}) => (
  <Wrapper as={Container}>
    <SEO
      url="/reset-password"
      title="Reset Password"
      description="Rest password"
    />
    <Card>
      {loading ? (
        <Loading />
      ) : (
        <Form>
          <InputField
            relative
            label="New password"
            error={errors.password && touched.password}
          >
            {values.confirmPassword.length > 2 && (
              <Show type="button" onClick={() => showPassword(!visible)}>
                Show
              </Show>
            )}
            <Field
              type={visible ? 'text' : 'password'}
              name="password"
              placeholder="New password"
            />
            <ErrorMessage component={Error} name="password" />
          </InputField>
          <InputField
            label="Confirm password"
            error={errors.confirmPassword && touched.confirmPassword}
          >
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <ErrorMessage component={Error} name="confirmPassword" />
          </InputField>
          <Center>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner name="circle" color="white" />
              ) : (
                <span>Confirm</span>
              )}
            </Button>
          </Center>
        </Form>
      )}
    </Card>
  </Wrapper>
)

const enhance = compose(
  connect(
    null,
    { resetPassword }
  ),
  withState('error', 'setError', null),
  withState('token', 'setToken', null),
  withState('loading', 'setLoading', true),
  withState('visible', 'showPassword', false),
  lifecycle({
    componentDidMount() {
      const url = new URL(window.location.href)
      const token = url.searchParams.get('token')

      if (token) {
        this.props.setToken(token)
        this.props.setLoading(false)
      } else {
        this.props.setLoading(false)
        this.props.history.push('/')
      }
    },
  }),
  withFormik({
    mapPropsToValues: () => ({
      password: '',
      confirmPassword: '',
    }),
    validationSchema: () =>
      Yup.object().shape({
        password: Yup.string().required('Required field'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Please confirm your password'),
      }),
    handleSubmit: (
      { password, confirmPassword },
      { props: { resetPassword, token }, setErrors, setSubmitting, resetForm }
    ) => {
      const payload = {
        password,
        confirmPassword,
      }
      resetPassword(payload, setErrors, setSubmitting, resetForm, token)
    },
  })
)

export default enhance(ResetPassword)
