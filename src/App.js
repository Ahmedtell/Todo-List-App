import './App.css';
import ToDoList from './components/ToDoList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { ToastProvider } from './contexts/ToastContext';
import TodosProvider from './contexts/TodosContext';


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

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider
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
              <ToDoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
