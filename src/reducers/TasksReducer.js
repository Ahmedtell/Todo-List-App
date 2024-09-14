import { v4 as uuidv4 } from 'uuid';

export default function TasksReducer(currentTasks, action) {
    switch (action.type) {
        case "added": {
            const newTask = {
                id: uuidv4(),
                title: action.payload.newTitle,
                details: "",
                completed: false,
                important: false,
            };
            const updatedTask = [...currentTasks, newTask];
            localStorage.setItem("Task", JSON.stringify(updatedTask));
            return updatedTask;
        }
        case "deleted": {
            let updatedTasks = currentTasks.filter((element) => element.id !== action.payload.id);
            localStorage.setItem("Task", JSON.stringify(updatedTasks));
            return updatedTasks;
        }
        case "updated": {
            let updatedTask = currentTasks.map((element) =>
                element.id === action.payload.id
                    ? { ...element, title: action.payload.title, details: action.payload.details }
                    : element
            );
            localStorage.setItem("Task", JSON.stringify(updatedTask));
            return updatedTask;
        }
        case "get": {
            const storageTodos = JSON.parse(localStorage.getItem("Task")) ?? [];
            return storageTodos;
        }
        case "completed": {
            let updatedTask = currentTasks.map((element) => {
                if (element.id === action.payload.id) {
                    return { ...element, completed: !element.completed };
                }
                return element;
            });
            localStorage.setItem("Task", JSON.stringify(updatedTask));
            return updatedTask;
        }
        case "important": {
            let importantTask = currentTasks.map((element) => {
                if (element.id === action.payload.id) {
                    return { ...element, important: !element.important };
                }
                return element;
            });
            localStorage.setItem("Task", JSON.stringify(importantTask));
            return importantTask;
        }
        default: {
            throw new Error("Unknown action: " + action.type);
        }
    }
}
