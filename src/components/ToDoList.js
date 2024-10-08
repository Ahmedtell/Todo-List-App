import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDo from './ToDo';
import Adding from '../AddTask';
import { useEffect, useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import { useTodos, useTodosDispatch } from "../contexts/TodosContext";
import { useToast } from '../contexts/ToastContext';



// DIALOG IMPORTS
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';



export default function ToDoList() {

    const { task } = useTodos();
    const { dispatch } = useTodosDispatch();
    const { showToast } = useToast(); // Destructuring
    const [displayTaskType, setDisplayTaskType] = useState("all");
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [dialogTask, setDialogTask] = useState(null);
    const [editDialog, setEditDialog] = useState(false);


    const completedTasks = useMemo(() => {
        return task.filter((element) => {
            // console.log("calling completed");
            return element.completed;
        });
    }, [task]);

    // before useMmeo => const notCompletedTasks = task.filter((element) => !element.completed);
    const notCompletedTasks = useMemo(() => {
        return task.filter((element) => {
            // console.log("calling not completed");
            return !element.completed;
        });
    }, [task])


    const importantTasks = useMemo(() => {
        return task.filter((element) => {
            // console.log("calling important");
            return element.important;
        });
    }, [task]);

    let tasksToBeRendered = task;
    if (displayTaskType === "completed") {
        tasksToBeRendered = completedTasks;
    } else if (displayTaskType === "not-completed") {
        tasksToBeRendered = notCompletedTasks;
    }
    else if (displayTaskType === "important") {
        tasksToBeRendered = importantTasks;
    }

    useEffect(() => {
        dispatch({
            type: "get",
        })
    }, []);

    // START HANDLERS 

    function changeDisplayedType(event) {
        setDisplayTaskType(event.target.value);
    }

    function handleAdd(titleInput) {
        dispatch({
            type: "added",
            payload: {
                newTitle: titleInput,

            }
        })
        showToast("تمت إضافة المهمة بنجاح");
    }

    function handleCloseDeleteDialog() {
        setDeleteDialog(false);
    }

    function openDeleteDialog(todo) {
        setDialogTask(todo);
        setDeleteDialog(true);
    }

    function openEditDialog(todo) {
        setDialogTask(todo);
        setEditDialog(true);
    }

    function deleteConfirm() {
        dispatch({
            type: "deleted",
            payload: dialogTask,
        })
        setDeleteDialog(false);
        showToast("تم حذف المهمة بنجاح")
    }

    function handleCloseEditDialog() {
        setEditDialog(false);
    }

    function handleUpdatedTask() {
        dispatch({
            type: "updated",
            payload: dialogTask,
        })
        setEditDialog(false);
        showToast("تم حفظ التعديلات بنجاح");
    }
    // END HANDLERS

    const tasksJSX = tasksToBeRendered.map((task) => {
        return (<ToDo key={task.id} todo={task} showDeleteDialog={openDeleteDialog} showEditClick={openEditDialog} />);
    });

    return (
        <>
            {/* Start Delete Dialog */}
            <Dialog
                style={{ direction: "rtl" }}
                onClose={handleCloseDeleteDialog}
                open={deleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"هل أنت متأكد من حذف المهمة ؟"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"
                        style={{ color: "red", fontSize: "14px" }}
                    >
                        لا يمكن استعادة المهمة بمجرد حذفها
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>إغلاق</Button>
                    <Button autoFocus onClick={deleteConfirm}>حذف</Button>
                </DialogActions>
            </Dialog>
            {/* End Delete Dialog */}

            {/* Start Edit Dialog */}
            <Dialog
                open={editDialog}
                onClose={handleCloseEditDialog}
            >
                <DialogTitle style={{ direction: "rtl" }}>تعديل المهمة</DialogTitle>
                <DialogContent style={{ direction: "rtl" }}>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="العنوان"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={dialogTask?.title || ""}
                        onChange={(event) => {
                            setDialogTask({ ...dialogTask, title: event.target.value });
                        }}
                    />

                    <TextField
                        required
                        margin="dense"
                        label="التفاصيل"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={dialogTask?.details || ""}
                        onChange={(event) => {
                            setDialogTask({ ...dialogTask, details: event.target.value });
                        }}
                    />
                </DialogContent>
                <DialogActions style={{ direction: "rtl" }}>
                    <Button onClick={handleCloseEditDialog}>إلغاء</Button>
                    <Button onClick={handleUpdatedTask}>حفظ</Button>
                </DialogActions>
            </Dialog>
            {/* End Edit Dialog */}

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
                            <ToggleButton value="not-completed">غير المنجزة</ToggleButton>
                            <ToggleButton value="completed">المنجزة</ToggleButton>
                            <ToggleButton value="important">المهمة</ToggleButton>
                            <ToggleButton value="all">الكل</ToggleButton>
                        </ToggleButtonGroup>
                        {tasksJSX}
                        <Adding handleAddClick={handleAdd} />
                    </CardContent>
                </Card>
            </Container>
        </>

    );
}
