export default (tasks, action) => {
	switch (action.type) {
		case "Add_NEW_TASK":
			return [...tasks, action.payload];
		case "TOGGLE_TASK":
			return tasks.map(
				item =>
					item.id === action.id
						? {
								...item,
								isDone: !item.isDone
						  }
						: item
			);
		default:
			return tasks;
	}
};
