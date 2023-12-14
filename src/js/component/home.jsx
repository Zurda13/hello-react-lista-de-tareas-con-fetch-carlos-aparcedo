import React, { useState } from 'react';

function TodoList() {
    //aca van todas las funcionalidades y la declaracion de los estados
    // 1. declarar todos los estados juntos y de primero
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [hoverIndex, setHoverIndex] = useState(null);
    // despues de los estados declaramos las funcionalidades, no importa el orden 

    function obtenerContenido() {
        fetch('https://playground.4geeks.com/apis/fake/todos/')

    }

    const addTask = () => {
        if (newTask !== '') {
            setTasks([...tasks, newTask]);
            setNewTask('');
        }
    };
    const handleKeyDown = (event) => { //esta es la funcion presionar "enter"
        if (event.key === 'Enter') {
            addTask();
            event.preventDefault();
        }
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const updateCounter = () => {
        return tasks.length;
    };

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };

    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const isTaskEmpty = tasks.length === 0;
    //aqui vamos a mopstrat todo lo que se ve en el componente

    //por una cuestion de buena practicas el useEffect se utiliza antes del return 

    // style={{ maxWidth: '400px', margin: '0 auto', boxShadow: '0 4px 6px rgba(45, 0, 9, 3)', borderRadius: '25px', backgroundColor: '#ffe4c4' }}
    return (
            <div className="container d-flex position-absolute top-50 start-50 translate-middle flex-column col-4 my-3 mx-auto shadow-lg p-3 mb-5 bg-secondary rounded-4 " >
                <h1 className="text-center mt-4">ToDo List</h1>
                {/* aqui esta puesta */}
                <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={handleKeyDown} placeholder="Que hay pa hoy...?" />
                <button onClick={addTask} className="justify-content-end btn btn-primary mt-1">Agregalo ▼</button>
                <ul className="list-group mt-3">
                    {tasks.map((task, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center py-2" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                            {task}
                            <button onClick={() => removeTask(index)} className="btn bg-dark-subtle p-0" style={{ display: hoverIndex === index ? 'block' : 'none' }}>x</button>
                        </li>
                    ))}
                </ul>
                <p className="text-center mt-3">Total tareas: {updateCounter()}</p>
                {isTaskEmpty && <p className="text-center">No hay tareas, añadir tareas</p>}
        </div>
    );
}

export default TodoList;

