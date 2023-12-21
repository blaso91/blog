import { Box, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { StatsContext } from "../contexts/StatsContext";

function RankingTable() {
    const { stats } = useContext(StatsContext);

    return (
        <Box sx={{ p: 1, boxShadow: 1 }}>
            <Typography variant="h6" component="h6">
                Classifica
            </Typography>
            <div className="ranking-table">
                {stats.rankings.map((user, i) => (
                    <div className="ranked-user" key={i + "" + Date.now()}>
                        <span className="pos">{i + 1}</span>
                        <div>
                            <span className="name">{user.name}</span>
                            <span className="email">{user.email}</span>
                        </div>
                        <span className="score">{stats.scoreType == 1 ? user.totalScore : user.writtenPosts}</span>
                    </div>
                ))}
            </div>
        </Box>
    )
}

export default RankingTable;