// import axios from 'axios'
// import setAuthToken from '../../utils/setAuthToken'

// const API = 'test'
// const URL = `https://cors-anywhere.herokuapp.com/${API}`

/* const authFailed = error => ({
	type: 'AUTH_FAILED',
	payload: error.response.data
}) */

/* export const verifyToken = token => dispatch => {
	dispatch({ type: 'LOADING_USER' })
	axios({
		method: 'GET',
		url: `${URL}/api/user/me`,
		headers: {
			'Content-Type': 'application/json',
			'x-auth': token
		}
	}).then(res => {
		setAuthToken(token)
		dispatch({ type: 'SAVE_USER', payload: res.data })
		history.push('/profile')
	})
		.catch(() => dispatch({ type: 'SAVE_USER', payload: {} }))
} */

export const register = (payload, setSubmitting /* , setErrors */) => dispatch => {
	dispatch({ type: 'LOADING_USER' })
	setTimeout(() => {
		dispatch({ type: 'SAVE_USER', payload })
		setSubmitting(false)
	}, 4000)
	/* axios.post(`${URL}/api/user/register`, payload)
		.then(res => {
			const { token } = res.data
			localStorage.setItem('jwtToken', token)
			setAuthToken(token)

			dispatch({ type: 'SAVE_USER', payload: res.data })
			setSubmitting(false)
			history.push('/profile')
		})
		.catch(err => {
			if (err.response.data.email) {
				setErrors({ email: err.response.data.email })
			} else if (err.response.data.email) {
				setErrors({ email: err.response.data.password })
			} else if (err.response.data.email && err.response.data.email) {
				setErrors({
					email: err.response.data.email,
					password: err.response.data.password
				})
			}
			setSubmitting(false)
			dispatch(authFailed(err.response.data))
		}) */
}

export const login = (payload, setSubmitting, navigate /* , setErrors */) => dispatch => {
	dispatch({ type: 'LOADING_USER' })
	setTimeout(() => {
		dispatch({ type: 'SAVE_USER', payload })
		setSubmitting(false)
		navigate('Profile')
	}, 4000)
	/* axios.post(`${URL}/api/user/login`, payload)
		.then(res => {
			const { token } = res.data
			localStorage.setItem('jwtToken', token)
			setAuthToken(token)

			dispatch({ type: 'SAVE_USER', payload: res.data })
			history.push('/profile')
		})
		.catch(err => {
			if (err.response.data.email) {
				setErrors({ email: err.response.data.email })
			} else if (err.response.data.email) {
				setErrors({ email: err.response.data.password })
			} else if (err.response.data.email && err.response.data.email) {
				setErrors({
					email: err.response.data.email,
					password: err.response.data.password
				})
			}
			setSubmitting(false)
			dispatch(authFailed(err.response.data))
		}) */
}

export const logout = navigate => dispatch => {
	dispatch({ type: 'LOADING_USER' })
	setTimeout(() => {
		dispatch({ type: 'SAVE_USER', payload: {} })
		navigate('Home')
	}, 4000)
	/* axios.delete(`${URL}/api/user/me/token`)
		.then(() => {
			localStorage.removeItem('jwtToken')
			setAuthToken(false)
			dispatch(({ type: 'SAVE_USER', payload: {} }))
			history.push('/')
		})
		.catch(err => console.log(err)) */
}
