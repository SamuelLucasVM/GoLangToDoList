import styles from "./todo.module.css";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai"
import { MdDone } from "react-icons/md";
import { useRef } from "react";

function Todo(props) {
    const titleRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        props.handleEditTask({ id: props.id, title: titleRef.current.value, description: descriptionRef.current.value, done: props.done });

        props.handleSetToEdit(undefined);
    }

    return (
        <div className={styles.todo}>
            {props.done && (<button onClick={() => props.changeDone(props.id)} className={`${styles.doneButton} ${styles.filledButton}`} />)}
            {!props.done && (<button onClick={() => props.changeDone(props.id)} className={`${styles.doneButton}`} />)}

            {!props.isEditing && (
                <>
                    <div className={styles.texts}>
                        <h3 className={styles.title}>{props.title}</h3>
                        <p className={styles.description}>{props.description}</p>
                    </div>
                    <AiOutlineEdit size={25} color="yellow" onClick={() => props.handleSetToEdit(props.id)} />
                </>
            )}
            {props.isEditing && (
                <>
                    <form onSubmit={handleSubmit}>
                        <input
                            ref={titleRef}
                            type="text"
                            placeholder="Título"
                        />
                        <input
                            ref={descriptionRef}
                            type="text"
                            placeholder="Descrição"
                        />
                    </form>
                    <MdDone size={25} color="yellow" onClick={handleSubmit} />
                </>
            )}

            <BsTrash3 size={25} color="yellow" onClick={() => props.deleteTask(props.id)} />
        </div>
    )
}

export default Todo;