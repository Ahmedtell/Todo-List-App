import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { useContext, useState } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function ToDo({ todo }) {
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [updatedTaskContent, setUpdatedTaskContent] = useState({ title: todo.title, details: todo.details });


    const { task, setTask } = useContext(TodosContext);

    function handleCheckClick() {
        let updatedTask = task.map((element) => {
            if (element.id === todo.id) {
                element.completed = !element.completed;
            }
            return element;
        });
        setTask(updatedTask);
        localStorage.setItem("Task", JSON.stringify(updatedTask));
    }

    function handleImportantTask() {
        let importantTask = task.map((element) => {
            if (element.id === todo.id) {
                element.important = !element.important;
            }
            return element;
        });
        setTask(importantTask);
        localStorage.setItem("Task", JSON.stringify(importantTask));
    }

    function handleDeleteClick() {
        setDeleteDialog(true);
    }

    function deleteConfirm() {
        let updatedTasks = task.filter((element) => element.id !== todo.id);
        setTask(updatedTasks);
        setDeleteDialog(false);
        localStorage.setItem("Task", JSON.stringify(updatedTasks));
    }

    function handleCloseDeleteDialog() {
        setDeleteDialog(false);
    }

    function handleEditClick() {
        setEditDialog(true);
    }

    function handleCloseEditDialog() {
        setEditDialog(false);
    }

    function handleUpdatedTask() {
        let updatedTask = task.map((element) =>
            element.id === todo.id
                ? { ...element, title: updatedTaskContent.title, details: updatedTaskContent.details }
                : element
        );
        setTask(updatedTask);
        setEditDialog(false);
        localStorage.setItem("Task", JSON.stringify(updatedTask));
    }

    return (
        <>
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
                        style={{ color: "red", fontSize: "13px" }}
                    >
                        لا يمكن استعادة المهمة بمجرد حذفها
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>إغلاق</Button>
                    <Button autoFocus onClick={deleteConfirm}>نعم</Button>
                </DialogActions>
            </Dialog>

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
                        value={updatedTaskContent.title}
                        onChange={(event) => {
                            setUpdatedTaskContent({ ...updatedTaskContent, title: event.target.value })
                        }}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="التفاصيل"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedTaskContent.details}
                        onChange={(event) => {
                            setUpdatedTaskContent({ ...updatedTaskContent, details: event.target.value });
                        }}
                    />
                </DialogContent>
                <DialogActions style={{ direction: "rtl" }}>
                    <Button onClick={handleCloseEditDialog}>إلغاء</Button>
                    <Button onClick={handleUpdatedTask}>تعديل</Button>
                </DialogActions>
            </Dialog>

            <Card sx={{
                minWidth: 275,
                backgroundColor: "#7b1fa2",
                color: "white",
                marginTop: 5
            }}>
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={12}>
                            <Grid xs={8}>
                                <Typography
                                    sx={{ textAlign: "right", wordWrap: "break-word", maxWidth: "85%", textDecoration: todo.completed ? "line-through" : "none" }}
                                    variant='h6'
                                >
                                    {todo.title}
                                </Typography>
                                <Typography
                                    sx={{ textAlign: "right", wordWrap: "break-word", maxWidth: "85%" }}
                                    variant='subtitle1'
                                >
                                    {todo.details}
                                </Typography>
                            </Grid>

                            <Grid
                                sm={4}
                                display="flex"
                                justifyContent="flex-end"
                                alignItems="center"
                                style={{ gap: "8px" }} // Adjust the gap as needed
                            >
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ width: "40px", height: "40px" }} // Set a fixed size for the container
                                >
                                    {/* important button */}
                                    <IconButton
                                        onClick={handleImportantTask}
                                        className="iconButton"
                                        style={{
                                            backgroundColor: todo.important ? "#ffc107" : "white",
                                            color: todo.important ? "white" : "#ffc107",
                                            width: "100%",
                                            height: "100%",

                                        }}
                                    >
                                        <StarIcon />
                                    </IconButton>
                                </Box>

                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ width: "40px", height: "40px" }}
                                >
                                    {/* cehck button */}
                                    <IconButton
                                        onClick={handleCheckClick}
                                        className="iconButton"
                                        style={{
                                            backgroundColor: todo.completed ? "#4caf50" : "white",
                                            color: todo.completed ? "white" : "#4caf50",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                </Box>

                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ width: "40px", height: "40px" }}
                                >

                                    {/* edit button */}
                                    <IconButton
                                        onClick={handleEditClick}
                                        className="iconButton"
                                        style={{
                                            color: "#303f9f",
                                            backgroundColor: "white",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Box>

                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ width: "40px", height: "40px" }}
                                >

                                    {/* delete button */}
                                    <IconButton
                                        onClick={handleDeleteClick}
                                        className="iconButton"
                                        style={{
                                            color: "#b71c1c",
                                            backgroundColor: "white",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Grid>

                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
};

