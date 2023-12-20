export function GetStatsFromUserId(userId, postsList) {
    if (!userId)
        return null;
    const posts = postsList;
    const userPosts = posts.filter(post => post.userId == userId)
    const iniScore = 0;
    const totalScore = userPosts.reduce((prevCount, currPost) => prevCount + GetScoreFromPost(currPost), iniScore);
    return {
        writtenPosts: userPosts.length,
        totalScore: totalScore
    }
}

export function AnimateRankingList(currPos, targetPos) {
    return new Promise((resolve, reject) => {
        const wrapper = document.querySelector('.ranking-table');
        const targetItem = wrapper.querySelector(`.ranked-user:nth-child(${targetPos})`);
        const currItem = wrapper.querySelector(`.ranked-user:nth-child(${currPos})`);
        let itemToMove = targetItem;
        for (let i = 0; i < currPos - targetPos; i++) {
            itemToMove.querySelector('.pos').textContent = targetPos + i + 1;
            itemToMove.style.transform = `translateY(${itemToMove.nextElementSibling.offsetTop - itemToMove.offsetTop}px)`;
            itemToMove = itemToMove.nextElementSibling;
        }
        currItem.style.transform = `translateY(${targetItem.offsetTop - currItem.offsetTop}px)`;
        currItem.querySelector('.pos').textContent = targetPos;
        setTimeout(() => { resolve() }, 500)
    })
}

export function ResetAnimation() {
    const items = document.querySelectorAll('.ranking-table .ranked-user');
    items.forEach(item => item.style.transform = "");
}

export function GetRankings(users, posts) {
    const usersStats = [];
    users.forEach(async user => {
        const userObj = {
            ...GetStatsFromUserId(user.id, posts),
            name: user.name,
            id: user.id,
            email: user.email
        }
        usersStats.push(userObj);
    })
    return usersStats.sort((a, b) => {
        if (a.writtenPosts > b.writtenPosts)
            return -1;
        if (a.writtenPosts < b.writtenPosts)
            return 1;
        return 0;
    });
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