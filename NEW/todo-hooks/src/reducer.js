export default (state, action) => {
    switch (action.type) {
        case 'Add_NEW_TASK':
            return [
                ...state,
                action.payload
            ]
        case 'TOGGLE_TASK':
            return state.map(item => item.id === action.id ? {
                    ...item,
                    isDone: !item.isDone
                } : item)
        default:
            return state
    }
}