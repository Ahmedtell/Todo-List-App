import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useState } from 'react';

export default function Adding({ handleAddClick }) {
    const [titleInput, setTitleInput] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);

    function handleAdd() {
        if (titleInput.length === 0) {
            setErrorMessage(true);
            return;
        }
        handleAddClick(titleInput);
        setTitleInput(""); // Clear input after adding task
        setErrorMessage(false);
    }

    return (
        <div>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" />}
                style={{
                    justifyContent: "left",
                    width: "100%",
                    marginTop: "20px",
                }}
            >
                <TextField
                    error={errorMessage}
                    style={{
                        width: "70%",
                        marginLeft: "3%",
                        borderColor: `${errorMessage ? "yellow" : ''}`
                    }}
                    value={titleInput}
                    onChange={(event) => {
                        let value = event.target.value;
                        setTitleInput(value);
                        if (value.length > 0) {
                            setErrorMessage(false);
                        }
                    }}
                    id="outlined-basic" label="عنوان المهمة" variant="outlined"
                    helperText={errorMessage ? "لا يمكنك ترك الحقل فارغاً" : ""}
                />
                <Button variant="contained"
                    style={{
                        backgroundColor: "",
                        width: "30%",
                        maxHeight: "55px",
                    }}
                    onClick={handleAdd}
                >
                    اضافة
                </Button>
            </Stack>
        </div>
    );
}
