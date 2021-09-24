import React from 'react'
import Spinner from 'react-spinkit'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import Recaptcha from 'react-google-recaptcha'
import { login } from '../actions'
import {
  Container,
  Button,
  InputField,
  Error,
  SEO,
} from '../../../components/common'
import {
  Card,
  Center,
  Show,
  Item,
  Img,
  FormWrapper,
  LoginWrapper,
} from '../styles'
import choicePill from '../assets/choice.png'

const Login = ({
  errors,
  touched,
  isSubmitting,
  showPassword,
  visible,
  values,
  setFieldValue,
}) => (
  <LoginWrapper as={Container}>
    <SEO url="/login" title="Login" description="Login" />
    <Card login="true">
      <Item>
        <Img src={choicePill} alt="make a choice" />
      </Item>
      <Item>
        <FormWrapper>
          <Form>
            <InputField label="Email" error={errors.email && touched.email}>
              <Field type="email" name="email" placeholder="Email" />
              <ErrorMessage component={Error} name="email" />
            </InputField>
            <InputField
              relative
              label="Password"
              error={errors.password && touched.password}
            >
              {values.password.length > 2 && (
                <Show type="button" onClick={() => showPassword(!visible)}>
                  Show
                </Show>
              )}
              <Field
                type={visible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
              />
              <ErrorMessage component={Error} name="password" />
            </InputField>
            <Link to="/forgotten/password">Forgotten password?</Link>
            <InputField>
              <Field
                component={Recaptcha}
                sitekey="6Lcs6lQUAAAAAEwhNH2IsobIe2csdda4TU3efpMN"
                name="recaptcha"
                onChange={value => setFieldValue('recaptcha', value)}
              />
              <ErrorMessage component={Error} name="recaptcha" />
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
          <Center>
            <p>
              Don't have an account? no worries!{' '}
              <Link to="/register">Create one</Link>
            </p>
          </Center>
        </FormWrapper>
      </Item>
    </Card>
  </LoginWrapper>
)

const enhance = compose(
  connect(
    null,
    { login }
  ),
  withState('visible', 'showPassword', false),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ recaptcha }) => ({
      email: '',
      password: '',
      recaptcha: recaptcha || '',
    }),
    validationSchema: () =>
      Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required('Required field'),
        password: Yup.string().required('Required field'),
        recaptcha: Yup.string().required(
          'Robots are not welcome yet! maybe soon 😊'
        ),
      }),
    handleSubmit: (
      { email, password },
      { props: { login }, setErrors, setSubmitting, resetForm }
    ) => {
      const payload = {
        email,
        password,
      }
      login(payload, setErrors, setSubmitting, resetForm)
    },
  })
)

export default enhance(Login)
