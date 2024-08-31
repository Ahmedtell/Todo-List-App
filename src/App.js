import './App.css';
import ToDoList from './components/ToDoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './contexts/TodosContext';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#0091ea",
    }
  },
});

function App() {
  const [task, setTask] = useState([]);

  function handleAddClick(titleInput) {
    const newTask = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      completed: false,
      important: false,
    }
    const updatedTask = [...task, newTask];
    setTask(updatedTask);
    localStorage.setItem("Task", JSON.stringify(updatedTask));
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App"
        style={{
          direction: "rtl",
          height: "100vh",
          backgroundColor: "#F4A460",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TodosContext.Provider
          value={{
            task: task,
            setTask: setTask,
          }}
        >
          <ToDoList handleAdd={handleAddClick} />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
