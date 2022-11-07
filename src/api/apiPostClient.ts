import axios from "axios";
import {tags, user} from "../services/constants";

const API_URL = "https://dummyapi.io/data/v1"
axios.defaults.baseURL = API_URL
const headers = {
    'app-id': '6360f44cc4873cf468295e0f'
}

export const PostDataService = {
    async getList() {
        return axios.get(`/post`, {headers: headers})
    },

    async getPostById(id?: string) {
        if (!id) return
        return axios.get(`/post/${id}`, {headers: headers})
    },

    async createPost(text: string, image: string) {
        return axios.post(
            `/post/create`,
            {
                owner: user.id,
                image: image,
                text: text,
                tags: tags
            },
            {headers: headers}
        )
    },

    async updatePost(postId?: string, text?: string) {
        if (!postId || !text) return
        return axios.put(
            `/post/${postId}`,
            {
                post: postId,
                text: text,
                tags: tags
            },
            {headers: headers}
        )
    },

    async deletePost(postId?: string) {
        if (!postId) return
        return axios.delete(
            `/post/${postId}`,
            {headers: headers}
        )
    },
}