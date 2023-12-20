import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import CreatePostDialog from './CreatePostDialog';
import { StatsContext } from "../contexts/StatsContext";
import { Chip } from "@mui/joy";

function StatsTable() {
    const [postDialogOpen, setPostDialogOpen] = useState(false);
    const { user } = useContext(UserContext);
    const { stats } = useContext(StatsContext);

    const rankedUser = user && stats.rankings.length ? stats.rankings.find(rankedUser => rankedUser.id == user.id) : null;
    const rank = user && stats.rankings.length ? stats.rankings.findIndex(rankedUser => rankedUser.id == user.id) + 1 : 0;
    const precedingRankedUser = stats.rankings[rank - 2];
    const followingRankedUser = stats.rankings[rank];

    const getClassNameByRank = () => {
        let className = "";
        switch (rank) {
            case 1:
                className = "first-pos";
                break;
            case 2:
                className = "second-pos";
                break;
            case 3:
                className = "third-pos";
                break;
            default:
                break;
        }
        return className;
    }

    const getFeedbackMessageByRank = () => {
        let feedbackMessage = "";
        switch (rank) {
            case 1:
                feedbackMessage = "Congratulazioni, hai raggiunto la prima posizione! Continua così per mantenere la testa della classifica.";
                break;
            case 2:
            case 3:
                feedbackMessage = "Congratulazioni, sei sul podio! Continua così per raggiungere la prima posizione.";
                break;
            default:
                feedbackMessage = "Continua a scrivere post per scalare la classifica e raggiungere il podio!";
                break;
        }
        return feedbackMessage;
    }

    return (
        <>
            <Box sx={{ p: 1, boxShadow: 1 }}>
                <Typography variant="h6" component="h6">
                    Le tue statistiche
                </Typography>
                {!user && (
                    <Typography>
                        Accedi per visualizzare le tue statistiche e creare nuovi post!
                    </Typography>
                )}
                {user && (
                    <>
                        {stats && (
                            <div className="stats-recap">
                                <div className="stats-recap-table">
                                    <div className="stats-recap-score">
                                        <span className="stats-recap-score-label">Numero di post scritti</span>
                                        <span className="stats-recap-score-value">{rankedUser?.writtenPosts}</span>
                                    </div>
                                    <div className="stats-recap-rank">
                                        <span className="stats-recap-rank-label">Posizione in classifica</span>
                                        <span className={"stats-recap-rank-value" + " " + getClassNameByRank()}>{rank}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {precedingRankedUser && (
                            <div className="preceding-following-message">
                                <Chip>{precedingRankedUser.name}</Chip> ti precede con <Chip>{precedingRankedUser.writtenPosts}</Chip> post, <Chip>{precedingRankedUser.writtenPosts - rankedUser.writtenPosts}</Chip> in più di te.
                            </div>
                        )}
                        {followingRankedUser && (
                            <div className="preceding-following-message">
                                <Chip>{followingRankedUser.name}</Chip> ti insegue con <Chip>{followingRankedUser.writtenPosts}</Chip> post, <Chip>{rankedUser.writtenPosts - followingRankedUser.writtenPosts}</Chip> in meno di te.
                            </div>
                        )}
                        <div className="rank-feedback-message">
                            {getFeedbackMessageByRank()}
                        </div>
                        <div className="button-wrapper">
                            <Button variant="contained" onClick={() => { setPostDialogOpen(true) }}>CREA POST</Button>
                        </div>
                    </>
                )}
            </Box>
            <CreatePostDialog open={postDialogOpen} handleClose={() => { setPostDialogOpen(false) }} />
        </>
    )
}

export default StatsTable;