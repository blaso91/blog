import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Auth } from "../libs/api";
import { ValidateEmail } from "../libs/utils";

function LoginDialog({ open, handleClose }) {
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const { setUser } = useContext(UserContext);

    const handleLogin = async () => {
        if (email.trim() == "" || ValidateEmail(email) == false)
            return setEmailError(true);
        if (password.trim() == "")
            return setPasswordError(true);

        const res = await Auth.Login(email, password);
        if (res) {
            setUser(res);
            localStorage.setItem('user', JSON.stringify(res));
            handleClose();
            setSuccessMessageOpen(true)
        }
    }

    useEffect(() => {
        if (!open) {
            setEmail("");
            setEmailError(false);
            setPassword("");
            setPasswordError(false);
        }
    }, [open])

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Indirizzo email"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email}
                        error={emailError}
                        onKeyDown={e => {
                            setEmailError(false);
                            if (e.key === 'Enter')
                                handleLogin();
                        }}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        error={passwordError}
                        onKeyDown={e => {
                            setPasswordError(false);
                            if (e.key === 'Enter')
                                handleLogin();
                        }}
                        onChange={e => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annulla</Button>
                    <Button onClick={handleLogin}>Accedi</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={successMessageOpen} autoHideDuration={6000} onClose={() => { setSuccessMessageOpen(false) }}>
                <Alert onClose={() => { setSuccessMessageOpen(false) }} severity="success" sx={{ width: '100%' }}>
                    Login effettuato con successo!
                </Alert>
            </Snackbar>
        </>
    )
}

export default LoginDialog;