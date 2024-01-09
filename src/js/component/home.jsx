import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [task, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [hoverIndex, setHoverIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...task, { label: newTask, done: false }]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    const newTasks = task.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = (index) => {
    setHoverIndex(index);
  };

  const updateCounter = () => {
    return task.length;
  };

  useEffect(() => {
    const obtenerListaTareas = async () => {
      try {
        const response = await fetch(
          "https://playground.4geeks.com/apis/fake/todos/user/Carlos.Aparcedo"
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerListaTareas();
  }, []);

  useEffect(() => {
    const actualizarListaTareas = async () => {
      try {
        await fetch("https://playground.4geeks.com/apis/fake/todos/user/Carlos.Aparcedo", {
          method: "PUT",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    actualizarListaTareas();
  }, [task]);

  return (
    <div className="container d-flex position-absolute top-50 start-50 translate-middle flex-column col-4 my-3 mx-auto shadow-lg p-3 mb-5 bg-secondary rounded-4">
      <h1 className="text-center mt-4">ToDo List</h1>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={handleKeyDown} placeholder="¿Qué hay para hoy...?"/>
      <button onClick={addTask} className="justify-content-end btn btn-primary mt-1">Agregalo ▼</button>
      
      <ul className="list-group mt-3">
        {task.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center py-2" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
            {task.label}
            <button
              onClick={() => removeTask(index)} className="btn bg-dark-subtle p-0" style={{ display: hoverIndex === index ? "block" : "none" }}>x</button>
          </li>
        ))}
      </ul>
      <p className="text-center mt-3">Total de tareas: {updateCounter()}</p>
      {task.length === 0 && <p className="text-center">No hay tareas, agregar tareas</p>}
      <button onClick={removeAllTasks} className="justify-content-end btn btn-danger mt-1">Delete All</button>
    </div>
  );
};

export default TodoList;