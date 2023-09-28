import { useTasks } from "../hooks/hooks.zustand";
import React, { FormEventHandler, MouseEventHandler } from "react";
import "../App.css";
export const Tasks = () => {
  const { tasks, completedTasks, addTask, deleteTask, deleteCompletedTasks } =
    useTasks();
  const [newTask, setNewTask] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };
  const handleDeleteTask: MouseEventHandler<HTMLLIElement> = (event) => {
    const task = event.currentTarget.textContent;
    if (task) {
      completedTasks.push(task);
      deleteTask(task);
    }
  };
  const handleAddTask: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    if (newTask) {
      addTask(newTask);
      setNewTask("");
    }
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (newTask) {
      addTask(newTask);
      setNewTask("");
    }
  };
  const handleDeleteCompletedTasks: MouseEventHandler<HTMLLIElement> = (
    event
  ) => {
    event.preventDefault();
    const task = event.currentTarget.value;
    if (completedTasks.length) {
      deleteCompletedTasks(completedTasks[task]);
      // completedTasks.forEach((task) => deleteCompletedTasks(task));
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newTask} />{" "}
        <button onClick={handleAddTask} type="submit">
          add task
        </button>
      </form>
      <p>Tasks : {tasks.length}</p>
      <ul>
        {tasks.map((task, index: number) => (
          <li className="task" onClick={handleDeleteTask} key={index}>
            {task}
          </li>
        ))}
      </ul>
      <hr />
      <p>complete tasks : {completedTasks.length}</p>
      <ul>
        {completedTasks.map((task, index: number) => (
          <li
            className="task-completed"
            key={index}
            onClick={handleDeleteCompletedTasks}
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};
