import axios from "axios";
import { user } from "../services/constants";

const API_URL = "https://dummyapi.io/data/v1"
axios.defaults.baseURL = API_URL
const headers = {
    'app-id': '6360f44cc4873cf468295e0f'
}

export const CommentDataService = {
    async getCommentsByPost(id: string) {
        return axios.get(`/post/${id}/comment`, {headers: headers})
    },

    async createComment(message: string, post: string) {
        return axios.post(
            `/comment/create`,
            {
                owner: user.id,
                post: post,
                message: message,
            },
            {headers: headers}
        )
    }
}