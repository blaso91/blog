import { Posts, Users } from "./api";

export async function GetStatsFromUser(user, postsList) {
    if (!user)
        return null;
    const userId = user.id;
    const posts = postsList || await Posts.GetList();
    const userPosts = posts.filter(post => post.userId == userId)
    const iniScore = 0;
    const totalScore = userPosts.reduce((prevCount, currPost) => prevCount + GetScoreFromPost(currPost), iniScore);
    return {
        writtenPosts: userPosts.length,
        totalScore: totalScore,
        name: user.name
    }
}

export async function GetRankings() {
    const users = await Users.GetList();
    const posts = await Posts.GetList();
    const usersStats = [];
    users.forEach(async user => {
        usersStats.push(await GetStatsFromUser(user, posts));
    })
    return usersStats;
}

export function GetScoreFromPost(postObj) {
    if (typeof postObj !== 'object')
        return 0;
    return postObj.body.split(' ').length;
}