import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { GetStatsFromUser } from "../libs/utils";

function StatsTable() {
    const user = useContext(UserContext);
    const [stats, setStats] = useState(null);

    const GetStats = async () => {
        const res = await GetStatsFromUser(user);
        setStats(res);
    }

    useEffect(() => {
        GetStats()
    }, [user])
    const createPost = () => {

    }
    return (
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
                {/* <div>Crea un nuovo post</div> */}
                <Button onClick={createPost}>CREA POST</Button>
            </>)}
        </Box>
    )
}

export default StatsTable;