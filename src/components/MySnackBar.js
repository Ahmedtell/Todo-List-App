import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function MySnackBar({ open, toastMessage }) {



    return (
        <div style={{
            direction: "ltr"
        }}>
            <Stack direction="row" spacing={2}>
                <Snackbar
                    open={open}
                >
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {toastMessage}
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    );
}
