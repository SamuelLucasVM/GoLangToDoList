import { useCallback, useRef, useState } from "react";
import styles from "./add_task_container.module.css"
import { AiOutlineCloseCircle } from "react-icons/ai"

function AddTaskContainer(props) {
    const titleRef = useRef();
    const descriptionRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        props.handleAddTask({ title: titleRef.current.value, description: descriptionRef.current.value });

        props.handleToggleNewTask();
    }

    return (
        <>
            <div className={styles.darkBackground} />
            <div className={styles.container}>
                <header className={styles.header}>
                    Adicionando Task
                    <AiOutlineCloseCircle size={25} onClick={() => props.handleToggleNewTask()} />
                </header>
                <form className={styles.body} onSubmit={handleSubmit}>
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
                    <button>Finish</button>
                </form>
            </div>
        </>
    )
}

export default AddTaskContainer;