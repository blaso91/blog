import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { GetStatsFromUserId } from "../libs/utils";
import CreatePostDialog from './CreatePostDialog';

function StatsTable() {
    const [postDialogOpen, setPostDialogOpen] = useState(false);
    const { user } = useContext(UserContext);
    const [stats, setStats] = useState(null);

    const GetStats = async () => {
        const res = await GetStatsFromUserId(user?.id);
        setStats(res);
    }

    useEffect(() => {
        GetStats()
    }, [user])

    return (
        <>
            <Box sx={{ p: 1, boxShadow: 1 }}>
                {!user && <div>Accedi per visualizzare le tue statistiche e creare nuovi post!</div>}
                {user && (<>
                    <div>Ciao, {user.name}</div>
                    {stats && (
                        <div>
                            Statistiche
                            <div>Numero di post scritti: {stats.writtenPosts}</div>
                            <div>Punteggio totale: {stats.totalScore}</div>
                        </div>
                    )}
                    <Button onClick={() => { setPostDialogOpen(true) }}>CREA POST</Button>
                </>)}
            </Box>
            <CreatePostDialog open={postDialogOpen} handleClose={() => { setPostDialogOpen(false) }} />
        </>
    )
}

export default StatsTable;