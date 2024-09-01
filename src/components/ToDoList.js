import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDo from './ToDo';
import Adding from '../AddTask';
import { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';

export default function ToDoList({ handleAdd }) {
    const { task, setTask } = useContext(TodosContext);
    const [displayTaskType, setDisplayTaskType] = useState("all");

    const completedTasks = task.filter((element) => element.completed);
    const nonCompletedTasks = task.filter((element) => !element.completed);
    const importantTask = task.filter((element) => element.important )

    let tasksToBeRendered = task;
    if (displayTaskType === "completed") {
        tasksToBeRendered = completedTasks;
    } else if (displayTaskType === "non-completed") {
        tasksToBeRendered = nonCompletedTasks;
    }
    else if (displayTaskType === "important") {
        tasksToBeRendered =  importantTask;
    }

    const tasksJSX = tasksToBeRendered.map((task) => {
        return <ToDo key={task.id} todo={task} />;
    });

    function changeDisplayedType(event) {
        setDisplayTaskType(event.target.value);
    }

    useEffect(() => {
        console.log("calling useEffect");
        const storageTodos = JSON.parse(localStorage.getItem("Task")) ?? [];
        if (storageTodos) {
            setTask(storageTodos);
        }
    }, [setTask]);

    return (
        <Container maxWidth="sm">
            <Card sx={{
                minWidth: 275,
                boxShadow: 3,
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            }}
                style={{
                    maxHeight: "80vh",
                    overflow: "auto",
                }}
            >
                <CardContent>
                    <Typography variant="h2"
                        style={{
                            fontWeight: "500",
                        }}
                    >
                        مهامي
                    </Typography>
                    <Divider />
                    <ToggleButtonGroup
                        value={displayTaskType}
                        style={{
                            direction: "ltr",
                            marginTop: "30px",
                        }}
                        exclusive
                        onChange={changeDisplayedType}
                        aria-label="text alignment"
                        color="primary"
                    >
                        <ToggleButton value="non-completed">غير المنجزة</ToggleButton>
                        <ToggleButton value="completed">المنجزة</ToggleButton>
                        <ToggleButton value="all">الكل</ToggleButton>
                        <ToggleButton value="important">المهمة</ToggleButton>
                    </ToggleButtonGroup>
                    {tasksJSX}
                    <Adding handleAddClick={handleAdd} />
                </CardContent>
            </Card>
        </Container>
    );
}
