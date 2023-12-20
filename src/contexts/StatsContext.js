import { createContext, useEffect, useState } from 'react';
import { Posts, Users } from '../libs/api';
import { GetRankings } from '../libs/utils';

export const StatsContext = createContext(null);

export function StatsContextProvider({ children }) {
    const [stats, setStats] = useState({
        posts: [],
        users: [],
        rankings: []
    })

    const GetStats = async () => {
        const posts = await Posts.GetList();
        const users = await Users.GetList();
        const rankings = GetRankings(users, posts);
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

    // when posts or users get updated I recalculate rankings
    useEffect(() => {
        setStats(prevState => ({
            ...prevState,
            rankings: GetRankings(stats.users, stats.posts)
        }))
    }, [stats.posts, stats.users])

    return (
        <StatsContext.Provider value={{ stats, setStats }}>
            {children}
        </StatsContext.Provider>
    )
}