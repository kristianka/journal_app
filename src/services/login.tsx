import api from "../api";
const baseUrl = "api/login";

interface LoginCredentials {
    username: string;
    password: string;
}

const login = async (credentials: LoginCredentials) => {
    const res = await api.post(baseUrl, credentials);
    return res.data;
};

export default { login };
