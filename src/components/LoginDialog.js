import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Auth } from "../libs/api";

function LoginDialog({ open, handleClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);

    const handleLogin = async () => {
        const res = await Auth.Login(email, password);
        if (res) {
            setUser(res);
            localStorage.setItem('user', JSON.stringify(res));
            handleClose();
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={e => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={handleLogin}>Accedi</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LoginDialog;