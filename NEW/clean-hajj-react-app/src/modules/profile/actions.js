import axios from 'axios'

const API = process.env.REACT_APP_PROD_API
// const API = 'http://localhost:5000'
const URL = `https://cors-anywhere.herokuapp.com/${API}`

export const editProfile = (profile, history) => dispatch => {
	dispatch({ type: 'LOADING_USER' })
	axios.patch(`${URL}/api/user`, profile)
		.then(res =>  {
			dispatch({ type: 'SAVE_USER', payload: res.data })
			history.push('/profile')
		})
		.catch(err => dispatch({ type: 'EDIT_PROFILE_FAILED', payload: err.response.data }))
}
