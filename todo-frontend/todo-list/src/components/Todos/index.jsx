import Todo from "../Todo";
import styles from "./todos.module.css";

function Todos(props) {
    return (
        <div className={styles.todos}>
            {props.todos.map((todoData) =>
                <Todo
                    title={todoData.title}
                    description={todoData.description}
                    done={todoData.done}
                    changeDone={props.changeDone}
                    id={todoData.id}
                    key={todoData.id}
                    deleteTask={props.deleteTask}
                    isEditing={props.idEditing == todoData.id}
                    handleSetToEdit={props.handleSetToEdit}
                    handleEditTask={props.handleEditTask}
                />)}
        </div>
    )
}

export default Todos;