import axios from "axios";

const BASE_URL = 'http://localhost:9000';

export const getTodos = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/`);
        return res.data;
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const changeDone = async (id) => {
    try {
        const res = await axios.put(`${BASE_URL}/do/${id}`, {});
        return res;
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const addTask = async (todo) => {
    try {
        const res = await axios.post(`${BASE_URL}/`, { title: todo.title, description: todo.description });
        return res;
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const deleteTask = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/${id}`);
        return res;
    } catch (error) {
        console.log("Error: ", error);
    }
}

export const editTask = async (todo) => {
    try {
        const res = await axios.put(`${BASE_URL}/${todo.id}`, { title: todo.title, description: todo.description, done: todo.done });
        return res;
    } catch (error) {
        console.log("Error: ", error);
    }
}