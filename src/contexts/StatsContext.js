import { createContext, useEffect, useState } from 'react';
import { Posts, Users } from '../libs/api';
import { GetRankings } from '../libs/utils';

export const StatsContext = createContext(null);

export function StatsContextProvider({ children }) {
    const [stats, setStats] = useState({
        posts: [],
        users: [],
        rankings: [],
        scoreType: new URLSearchParams(location.search).get('scoreType')
    })

    const GetStats = async () => {
        const posts = await Posts.GetList();
        const users = await Users.GetList();
        const rankings = GetRankings(users, posts, stats.scoreType);
        setStats(prevState => ({
            ...prevState,
            posts,
            users,
            rankings
        }))
    }

    useEffect(() => {
        GetStats()
    }, [])

    // when posts get updated I recalculate rankings
    useEffect(() => {
        setStats(prevState => ({
            ...prevState,
            rankings: GetRankings(stats.users, stats.posts, stats.scoreType)
        }))
    }, [stats.posts])

    return (
        <StatsContext.Provider value={{ stats, setStats }}>
            {children}
        </StatsContext.Provider>
    )
}