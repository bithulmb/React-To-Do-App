import ToDoForm from "./ToDoForm";
import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import ToDo from "./ToDo";
import EditToDoForm from "./EditToDoForm";
uuidv4();

const ToDoWrapper = () => {

    //declaring state variables with values from session storage
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("items")
        if (localValue == null) return []
    
        return JSON.parse(localValue)
      })

    //declaring useffect for storing the todos list in local storage everytime the value of to changes
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(todos));
      },[todos])

    //add todo function
    const addTodo = (todo) => {
        const newTodo = {id : uuidv4(), task : todo, completed : false, isEditing : false};
        setTodos([...todos, newTodo]);
    }

    //function for changing completed status option
    const toggleComplete = (id) => {
        (setTodos(
            todos.map((todo) => 
                todo.id===id ? {...todo, completed: !todo.completed} : todo
        )
    ));

    }

    //function to delete todo
    const deleteTodo = (id) => (
        setTodos(todos.filter(todo => todo.id !== id))
    );
    
    //function to edit todo editing status
    const editTodo = (id) => {
        setTodos(
            todos.map((todo) => 
                todo.id === id ? {...todo, isEditing : !todo.isEditing} : todo) 
        )
    }

    //function to edit todo task
    const editTask = (task,id) => {
        setTodos(
            todos.map(todo => 
                todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo)
            )
    }


    return (
    <div className="TodoWrapper">
        <h1>To Do List</h1>
        
        <ToDoForm addTodo = {addTodo}/>
        
        {todos.length===0 ? (
            <div></div>
        ) : (
              todos.map((todo) => (
                todo.isEditing ? (
                    <EditToDoForm editTodo={editTask} task={todo}/>
                ) : (
                    <ToDo task={todo} key={todo.id} toggleComplete = {toggleComplete} deleteTodo = {deleteTodo} editTodo={editTodo}/>
                )
                
            ))
        )}
      
    </div>
    )
}
export default ToDoWrapper;