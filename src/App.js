import './App.css';
import ToDoList from './components/ToDoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './contexts/TodosContext';
import { useState } from 'react';
import MySnackBar from './components/MySnackBar';
import { ToastContext } from './contexts/ToastContext';

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
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  function showToast(toastMessage){
    setOpen(true);
    setToastMessage(toastMessage);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider
      value={{showToast}}
      >
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
        <MySnackBar open={open} toastMessage={toastMessage} />
        <TodosContext.Provider
          value={{
            task: task,
            setTask: setTask,
          }}
        >
          <ToDoList />
        </TodosContext.Provider>
      </div>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}

export default App;
