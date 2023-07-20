import styles from "./container.module.css";
import Header from "../Header";
import Todos from "../Todos"

import * as service from "../../services/todos.js";
import { useCallback, useEffect, useState } from "react";
import AddTaskButton from "../AddTaskButton";
import AddTaskContainer from "../AddTaskContainer";

function Container() {
    const [todos, setTodos] = useState();
    const [toggleNewTask, setToggleNewTask] = useState(false);
    const [idEditing, setIdEditing] = useState();

    const handleSetToEdit = useCallback(async (id) => {
        setIdEditing(id);
    }, [])

    const getTodos = useCallback(async () => {
        try {
            const resTodos = await service.getTodos();
            setTodos(resTodos);
        } catch (error) {
            console.log("error: ")
            console.log(error);
        }
    }, []);

    const handleEditTask = useCallback(async(todo) => {
        try {
            const resEditTask = await service.editTask(todo);
            return resEditTask;
        } catch (error) {
            console.log("error: ")
            console.log(error);
        }
    }, [])

    const handleChangeDone = useCallback(async (id) => {
        try {
            const resChangeDone = await service.changeDone(id);
            return resChangeDone;
        } catch (error) {
            console.log("error: ")
            console.log(error);
        }
    }, []);

    const handleAddTask = useCallback(async (todo) => {
        try {
            const resAddTask = await service.addTask(todo);
            return resAddTask;
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleDeleteTask = useCallback(async (id) => {
        try {
            const resDeleteTask = await service.deleteTask(id);
            return resDeleteTask;
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleToggleNewTask = useCallback(() => {
        setToggleNewTask((p) => !p)
    }, [])

    useEffect(() => {
        getTodos();
    }, [todos]);

    return (
        <section className={styles.container}>
            <Header />
            {todos && (
                <Todos todos={todos} changeDone={handleChangeDone} deleteTask={handleDeleteTask} idEditing={idEditing} handleSetToEdit={handleSetToEdit} handleEditTask={handleEditTask}/>
            )}
            <AddTaskButton handleToggleNewTask={handleToggleNewTask} />
            {toggleNewTask && (
                <AddTaskContainer handleToggleNewTask={handleToggleNewTask} handleAddTask={handleAddTask} />
            )}
        </section>
    )
}

export default Container;