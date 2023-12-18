import axios from "axios";

export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const Users = {
    GetList: async () => {
        try {
            const users = (await axios.get(API_BASE_URL + "/users")).data;
            return users;
        } catch (error) {
            return null;
        }
    }
}

export const Auth = {
    Login: async (email, password) => {
        if (password != "Password")
            return null;

        try {
            const users = await Users.GetList();
            const user = users.find(user => user.email == email)
            return user;
        } catch (error) {
            console.error(error)
            return null;
        }
    }
}

export const Posts = {
    GetList: async (start = 0, count = -1) => {
        try {
            const posts = (await axios.get(API_BASE_URL + "/posts")).data;
            return posts.slice(start, start + count);
        } catch (error) {
            throw error;
        }
    },
    Create: async (title, text) => {
        const user = localStorage.getItem("user");
        if (!user)
            return null;
        const userId = user.id;
        try {
            const res = (await axios.post(API_BASE_URL + "/posts", {
                title,
                body: text,
                userId
            })).data;
            console.log(res);
            return res;
        } catch (error) {
            return null;
        }
    }
}