import React, { useState, useEffect } from 'react';
function TodoList() {
    //aca van todas las funcionalidades y la declaracion de los estados
    // 1. declarar todos los estados juntos y de primero
    const [task, setTask] = useState([]);
    const [newTask, setNewTask] = useState(''); // el SET lo que hace es modivicar el valor de algo
    const [hoverIndex, setHoverIndex] = useState(null);
    // despues de los estados declaramos las funcionalidades, no importa el orden
    function obtenerLista() {
        fetch("https://playground.4geeks.com/apis/fake/todos/user/Carlos.Aparcedo")
            .then((res) => res.json())
            // .then((data) => console.log(data)) primero se hace esto para probar que informacion me trae y luego pasamos a la siguiente parte de como se llame el array.
            .then((data) => setTask(data)) //a la siguiente parte de como se llame el array(setTask)
            .catch((error) => console.log(error))
    };
    const addTask = () => {
        if (newTask !== '') {
            setTask([...task, {"done": false,"label": newTask}]); //para ponerle un valor a la propiedad DEBES eliminar las comillas ""
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
        setTask(task.filter((_, i) => i !== index));
    };
    const updateCounter = () => {
        return task.length;
    };
    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };
    const handleMouseLeave = () => {
        setHoverIndex(null);
    };
    const isTaskEmpty = task.length === 0;
    //aqui vamos a mostrar todo lo que se ve en el componente
    //por una cuestion de buena practicas el useEffect se utiliza antes del return
    useEffect(() => {//cada vez que quiera ejecutar una funcion ni bien se cargue el componente debo hacer un useEffect, React dice esto va asi! siempre antes del
        obtenerLista()
    }, [])
    return (
        <div className="container d-flex position-absolute top-50 start-50 translate-middle flex-column col-4 my-3 mx-auto shadow-lg p-3 mb-5 bg-secondary rounded-4 " >
            <h1 className="text-center mt-4">ToDo List</h1>
            {/* aqui esta puesta */}
            <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={handleKeyDown} placeholder="Que hay pa hoy...?" />
            <button onClick={addTask} className="justify-content-end btn btn-primary mt-1">Agregalo ▼</button>
            <ul className="list-group mt-3">
                {task.map((task, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center py-2" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                        {task.label}
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