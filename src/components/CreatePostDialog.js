import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, TextareaAutosize } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Posts } from "../libs/api";
import { StatsContext } from "../contexts/StatsContext";
import { AnimateRankingList, GetRankings } from "../libs/utils";
import { UserContext } from "../contexts/UserContext";
import { LoadingButton } from "@mui/lab";

function CreatePostDialog({ open, handleClose }) {
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [text, setText] = useState("");
    const [textError, setTextError] = useState(false);
    const { setStats, stats } = useContext(StatsContext);
    const { user } = useContext(UserContext);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async () => {
        if (title.trim() == "")
            return setTitleError(true);
        if (text.trim() == "")
            return setTextError(true);

        setIsSubmitting(true)
        const post = await Posts.Create(title, text);
        setIsSubmitting(false);
        if (post) {
            handleClose();
            setSuccessMessageOpen(true);
            const currPos = stats.rankings.findIndex(rankedUser => rankedUser.id == user.id) + 1;
            const updatedRankings = GetRankings(stats.users, [...stats.posts, post]);
            const targetPos = updatedRankings.findIndex(rankedUser => rankedUser.id == user.id) + 1;
            await AnimateRankingList(currPos, targetPos);
            setStats(prevState => ({
                ...prevState,
                posts: [...prevState.posts, post]
            }))
        }
    }

    useEffect(() => {
        if (!open) {
            setTitle("");
            setTitleError(false);
            setText("");
            setTextError(false);
        }
    }, [open])

    return (<>
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
                    value={title}
                    error={titleError}
                    onKeyDown={e => {
                        setTitleError(false);
                        if (e.key === 'Enter')
                            handleSubmit();
                    }}
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
                    value={text}
                    error={textError}
                    onKeyDown={e => {
                        setTextError(false);
                        if (e.key === 'Enter')
                            handleSubmit();
                    }}
                    onChange={e => setText(e.target.value)}

                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <LoadingButton loading={isSubmitting} onClick={handleSubmit}>Crea</LoadingButton>
            </DialogActions>
        </Dialog>
        <Snackbar open={successMessageOpen} autoHideDuration={6000} onClose={() => { setSuccessMessageOpen(false) }}>
            <Alert onClose={() => { setSuccessMessageOpen(false) }} severity="success" sx={{ width: '100%' }}>
                Post creato con successo!
            </Alert>
        </Snackbar>
    </>

    )
}

export default CreatePostDialog;