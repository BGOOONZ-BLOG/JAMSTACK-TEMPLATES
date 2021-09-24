export default (state = { language: 'en' }, action) => {
	switch (action.type) {
	case 'CHANGE_LANGUAGE':
		return {
			...state,
			language: action.language
		}
	default:
		return state
	}
}
