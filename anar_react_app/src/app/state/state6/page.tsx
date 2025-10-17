"use client";
import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  return (
    <div>
      <input 
        value={newTask} placeholder="Шинэ даалгавар"
        onChange={(e) => setNewTask(e.target.value)}  
      />
      <button onClick={addTask}>Нэмэх</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}