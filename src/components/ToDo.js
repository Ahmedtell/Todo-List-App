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
import { useToast } from '../contexts/ToastContext';
import { useTodos, useTodosDispatch } from '../contexts/TodosContext';

export default function ToDo({ todo, showDeleteDialog, showEditClick }) {

    const { task } = useTodos();
    const { dispatch } = useTodosDispatch();
    const { showToast } = useToast();

    // function to set task as done
    function handleCheckClick() {
        dispatch({ type: "completed", payload: todo });
        const toastMessage = todo.completed
            ? "تمت الإزالة من قائمة المهام المنجزة"
            : "تم الإضافة الى قائمة المهام المنجزة";
        showToast(toastMessage);
    }

    // function to set task as important
    function handleImportantTask() {
        dispatch({ type: "important", payload: todo });
        const toastMessage = todo.important
            ? "تمت الإزالة من قائمة المهام المهمة"
            : "تمت الإضافة إلى قائمة المهام المهة";
        showToast(toastMessage);
    }

    function handleDeleteClick() {
        showDeleteDialog(todo);
    }

    function handleEditClick() {
        showEditClick(todo);
    }

    return (
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
                                {/* check button */}
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
    );
}

