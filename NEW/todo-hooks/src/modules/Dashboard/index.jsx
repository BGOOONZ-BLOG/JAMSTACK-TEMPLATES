import React, { useState, useContext } from "react";
import { Container, Input, Button, Task, Context } from "../common";
import { Wrapper } from "./Dashboard.module.scss";

const useInputValue = initial => {
	const [value, setValue] = useState(initial);

	return {
		value,
		onChange: e => setValue(e.target.value),
		resetValue: () => setValue("")
	};
};

const Dashboard = () => {
	const { resetValue, ...task } = useInputValue("");
	const { theme, toggleTheme, tasks, dispatch } = useContext(Context);

	const createTask = e => {
		e.preventDefault();

		const newTask = {
			id: tasks.length + 1,
			title: task.value,
			isDone: false
		};

		dispatch({ type: "Add_NEW_TASK", payload: newTask });
		resetValue();
	};

	const setDone = id => {
		const taskToCheck = tasks.find(task => task.id === id);
		dispatch({ type: "TOGGLE_TASK", id: taskToCheck.id });
	};

	return (
		<Container className={Wrapper}>
			<Button
				type="button"
				onClick={() => toggleTheme({ type: "TOGGLE_THEME" })}
			>
				Toggle theme
			</Button>
			<form onSubmit={createTask}>
				<Input type="text" {...task} autoComplete="off" />
				<Button type="submit">Add Task</Button>
			</form>
			{tasks.length > 0 &&
				tasks.map(({ id, title, isDone }) => (
					<Task
						key={id}
						title={title}
						isDone={isDone}
						color={theme}
						onClick={() => setDone(id)}
					/>
				))}
		</Container>
	);
};

export default Dashboard;
