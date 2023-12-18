import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import { Posts } from "../libs/api";

function CreatePostDialog({ open, handleClose }) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleSubmit = async () => {
        if (title.trim() == "")
            return;
        if (text.trim() == "")
            return;

        const post = await Posts.Create(title, text);
        if (post) {

        }
    }
    return (
        <Dialog open={open} onClose={() => { }}>
            <DialogTitle>Nuovo post</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Titolo"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Testo"
                    type="text"
                    fullWidth
                    variant="standard"
                    multiline
                    onChange={e => setText(e.target.value)}

                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={handleSubmit}>Crea</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreatePostDialog;