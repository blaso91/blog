import { Posts, Users } from "./api";

export async function GetStatsFromUserId(userId, postsList) {
    if (!userId)
        return null;
    const posts = postsList || await Posts.GetList();
    const userPosts = posts.filter(post => post.userId == userId)
    const iniScore = 0;
    const totalScore = userPosts.reduce((prevCount, currPost) => prevCount + GetScoreFromPost(currPost), iniScore);
    return {
        writtenPosts: userPosts.length,
        totalScore: totalScore
    }
}

export async function GetRankings() {
    const users = await Users.GetList();
    const posts = await Posts.GetList();
    const usersStats = [];
    users.forEach(async user => {
        const userObj = {
            ...await GetStatsFromUserId(user.id, posts),
            name: user.name
        }
        usersStats.push(userObj);
    })
    return usersStats;
}

export function GetScoreFromPost(postObj) {
    if (typeof postObj !== 'object')
        return 0;
    return postObj.body.split(' ').length;
}

/**
 * https://www.w3resource.com/javascript/form/email-validation.php
 */
export function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        return true

    return false
}