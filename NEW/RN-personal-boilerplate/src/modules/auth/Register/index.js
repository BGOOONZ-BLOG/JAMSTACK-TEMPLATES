import React from 'react'
import { compose } from 'recompose'
import { withFormik, Field } from 'formik'
import * as Yup from 'yup'
import { View } from 'react-native'
import { InputField, CustomButton, Error } from '../../common'
import { Wrapper } from '../styles'

const Register = ({
	values,
	touched,
	errors,
	handleSubmit,
	handleChange
}) => (
	<View style={{ flex: 1 }}>
		<Wrapper>
			<View>
				<Field
					component={InputField}
					onChangeText={handleChange('email')}
					value={values.email}
					placeholder="email"
					placeholderTextColor="#5282f0"
				/>
				{touched.email && errors.email && <Error>{errors.email}</Error>}
			</View>
			<View>
				<Field
					component={InputField}
					autoCorrect={false}
					onChangeText={handleChange('password')}
					value={values.password}
					placeholder="password"
					placeholderTextColor="#5282f0"
					secureTextEntry
				/>
				{touched.password && errors.password && <Error>{errors.password}</Error>}
			</View>
			<CustomButton onPress={handleSubmit} text="signup" />
		</Wrapper>
	</View>
)

const enhance = compose(
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
		handleSubmit(values, { setSubmitting }) {
			const payload = {
				email: values.email,
				password: values.password
			}
			setSubmitting(false)
			alert('Registered successfully!')
		}
	})
)

export default enhance(Register)
