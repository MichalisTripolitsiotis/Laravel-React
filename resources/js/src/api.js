import axios from 'axios';
const BASE_URL = 'http://localhost/api';

export default {
    getAllPosts: () => {
        return axios.get(`${BASE_URL}/posts`);
    },
    getOnePost: (id) => {
        return axios.get(`${BASE_URL}/posts/${id}`);
    },
    editPost: (id) => {
        return axios.get(`${BASE_URL}/posts/${id}/edit`);
    },
    addPost: (post) => {
        return axios.post(`${BASE_URL}/posts`, post);
    },
    updatePost: (post, id) => {
        return axios.put(`${BASE_URL}/posts/${id}`, post);
    },
    deletePost: (id) => {
        return axios.delete(`${BASE_URL}/posts/${id}`);
    }
};


