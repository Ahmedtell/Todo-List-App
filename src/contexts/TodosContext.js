import { createContext, useContext, useReducer } from "react";
import TasksReducers from "../reducers/TasksReducer"

export const TodosContext = createContext([]);
export const dispatchContext = createContext([null]);

const TodosProvider = ({ children }) => {
    const [tasks, tasksDispatch] = useReducer(TasksReducers, []);
    return (
        <TodosContext.Provider
            value={{
                task: tasks,
            }}
        >
            <dispatchContext.Provider
            value={{
                dispatch: tasksDispatch,
            }}
            >
            {children}
            </dispatchContext.Provider>
        </TodosContext.Provider>
    )
}
export const useTodos = () => {
    return useContext(TodosContext);
    
};
export const useTodosDispatch = () => {
    return useContext(dispatchContext);
}

export default TodosProvider;



