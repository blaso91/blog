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
        const interval = setInterval(() => {
            const wrapper = document.querySelector('.ranking-table');
            const item = wrapper.querySelector('div');
            const _item = wrapper.querySelector('div:nth-child(5)');
            item.style.transform = `translateY(${_item.offsetTop - item.offsetTop}px)`;
            _item.style.transform = `translateY(${item.offsetTop - _item.offsetTop}px)`;
        }, 5000)
        return () => { clearInterval(interval) }
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
                }).map((user, i) => (
                    <div key={i}>
                        <span>{i + 1}. </span>
                        <span>{user.name} </span>
                        <span>{user.totalScore}</span>
                    </div>
                ))}
            </div>
        </Box>
    )
}

export default RankingTable;