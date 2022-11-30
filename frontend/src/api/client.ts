import axios from 'axios';

const client = axios.create({ baseURL: import.meta.env.VITE_API_URL });

client.interceptors.response.use(
    (response) => {
        return response;
    }, 
    async (e) => {
        const { response } = e;
        if(response.status === 403) {
            window.location.href = window.location.origin;
        }
        return Promise.reject(e);
    }
)

export default client;
