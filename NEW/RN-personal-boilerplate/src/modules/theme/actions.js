export const handleLanguage = value => dispatch => {
	return dispatch({
		type: 'CHANGE_LANGUAGE',
		language: value
	})
}
