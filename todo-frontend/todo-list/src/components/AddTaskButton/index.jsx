import styles from "./add_task_button.module.css"

function AddTaskButton(props) {
    return (
        <button className={styles.button} onClick={() => props.handleToggleNewTask()}>
            Adicionar nova Task
        </button>
    )
}

export default AddTaskButton;