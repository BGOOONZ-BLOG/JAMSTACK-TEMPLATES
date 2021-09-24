import React from 'react'
import { connect } from 'react-redux'
import { withFormik, Field } from 'formik'
import * as Yup from 'yup'
import { compose } from 'recompose'
import { View } from 'react-native'
import { login } from '../actions'
import { InputField, CustomButton, Card, Vertical, Error } from '../../common'
import { Wrapper } from '../styles'

const Login = ({
	values,
	errors,
	touched,
	handleSubmit,
	handleChange
}) => (
	<Vertical>
		<Wrapper>
			<Card>
				<View>
					<Field
						component={InputField}
						value={values.email}
						placeholder="Email"
						onChangeText={handleChange('email')}
					/>
					{touched.email && errors.email && <Error>{errors.email}</Error>}
				</View>
				<View>
					<Field
						component={InputField}
						autoCorrect={false}
						value={values.password}
						placeholder="Password"
						onChangeText={handleChange('password')}
						secureTextEntry
					/>
					{touched.password && errors.password && <Error>{errors.password}</Error>}
				</View>
				<CustomButton onPress={handleSubmit} text="login" />
			</Card>
		</Wrapper>
	</Vertical>
)

const enhance = compose(
	connect(null, { login }),
	withFormik({
		mapPropsToValues() {
		  return {
				email: '',
				password: ''
		  }
		},
		validationSchema: () => Yup.object().shape({
			email: Yup.string().email('E-mail is not valid!').required(),
			password: Yup.string().min(6, 'Password has to be longer than 6 characters!').required(),
		  }),
		  handleSubmit(values, { props, /* setErrors, */ setSubmitting }) {
			const payload = {
				email: values.email,
				password: values.password
			}
			props.login(payload, setSubmitting, props.navigate)
		}
	})
)

export default enhance(Login)
