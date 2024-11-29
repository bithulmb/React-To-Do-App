import { useState } from "react"

const EditToDoForm = ({editTodo,task}) => {

    const [value,setValue] = useState(task.task)

    const handleSubmit = (e) => {
            e.preventDefault();

            editTodo(value, task.id);
            setValue("");
    }     

    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input type="text"  value = {value} className="todo-input" placeholder="Update Task?"  onChange={(e) => setValue(e.target.value)}/>
            <button type="submit" className="todo-btn"> Edit Task </button>

        </form>
    )
}

export default EditToDoForm;