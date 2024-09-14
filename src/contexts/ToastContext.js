import { createContext, useState, useContext } from "react";
import MySnackBar from '../components/MySnackBar';
export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    function showToast(toastMessage) {
        setOpen(true);
        setToastMessage(toastMessage);
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    }
    return (
        <ToastContext.Provider value={{ showToast }}>
            <MySnackBar open={open} toastMessage={toastMessage} />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
