
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addTask,
  deleteTask,
  updateTask,
  updateStatus
} from "../features/tasks/TaskSlice";

function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      status: "To Do"
    };

    dispatch(addTask(newTask));

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setAssignedTo("");
  };

  const handleEdit = (task) => {
    const newTitle = prompt("Enter the updated task title:", task.title);

    if (newTitle && newTitle.trim()) {
      dispatch(
        updateTask({
          ...task,
          title: newTitle.trim()
        })
      );
    }
  };

  return (
    <div>
      <h2>Task Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Assigned to"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <h2>All Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Due date: {task.dueDate || "Not set"}</p>
            <p>Assigned to: {task.assignedTo || "Unassigned"}</p>

            <label>Status: </label>
            <select
              value={task.status}
              onChange={(e) =>
                dispatch(
                  updateStatus({
                    id: task.id,
                    status: e.target.value
                  })
                )
              }
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <button onClick={() => handleEdit(task)}>
              Edit
            </button>

            <button onClick={() => dispatch(deleteTask(task.id))}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;
