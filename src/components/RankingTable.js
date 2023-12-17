import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { GetRankings } from "../libs/utils";

function RankingTable() {
    const [users, setUsers] = useState([])

    async function GetRankingData() {
        const rankings = await GetRankings();
        setUsers(rankings);
    }

    useEffect(() => {
        GetRankingData();
    }, [])

    return (
        <Box sx={{ p: 1, boxShadow: 1 }}>
            <div className="ranking-table">
                Classifica
                {users.sort((a, b) => {
                    if (a.totalScore > b.totalScore)
                        return -1;
                    if (a.totalScore < b.totalScore)
                        return 1;
                    return 0;
                }).map((user, i) => <div key={i}>{i + 1}. {user.name} {user.totalScore}</div>)}
            </div>
        </Box>
    )
}

export default RankingTable;