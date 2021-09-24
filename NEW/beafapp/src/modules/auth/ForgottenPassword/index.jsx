import React from 'react'
import Spinner from 'react-spinkit'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import * as Yup from 'yup'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import Recaptcha from 'react-google-recaptcha'
import { forgottenPassword } from '../actions'
import {
  Container,
  Button,
  InputField,
  Error,
  SEO,
} from '../../../components/common'
import { Card, Wrapper } from '../styles'

const ForgottenPassword = ({
  errors,
  touched,
  isSubmitting,
  setFieldValue,
}) => (
  <Wrapper as={Container}>
    <SEO
      url="/forgotten/password"
      title="Forgotten Password"
      description="Forgotten password"
    />
    <Card>
      <Form>
        <p>We will send you an email with the link to reset your password</p>
        <InputField label="Email" error={errors.email && touched.email}>
          <Field type="email" name="email" placeholder="Email" />
          <ErrorMessage component={Error} name="email" />
        </InputField>
        <InputField>
          <Field
            component={Recaptcha}
            sitekey="6Lcs6lQUAAAAAEwhNH2IsobIe2csdda4TU3efpMN"
            name="recaptcha"
            onChange={value => setFieldValue('recaptcha', value)}
          />
          <ErrorMessage component={Error} name="recaptcha" />
        </InputField>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner name="circle" color="white" />
          ) : (
            <span>Send email</span>
          )}
        </Button>
      </Form>
    </Card>
  </Wrapper>
)

const enhance = compose(
  connect(
    null,
    { forgottenPassword }
  ),
  withFormik({
    enableReinitialize: true,
    mapPropsToValues: ({ recaptcha }) => ({
      email: '',
      recaptcha: recaptcha || '',
    }),
    validationSchema: () =>
      Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required('Required field'),
        recaptcha: Yup.string().required(
          'Robots are not welcome yet! maybe soon 😊'
        ),
      }),
    handleSubmit: (
      { email },
      { props: { forgottenPassword }, setErrors, setSubmitting, resetForm }
    ) => {
      const payload = {
        email,
      }
      forgottenPassword(payload, setErrors, setSubmitting, resetForm)
    },
  })
)

export default enhance(ForgottenPassword)
