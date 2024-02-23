import api from "../api";
const baseUrl = "api/users";
import { BackendUserInterface, UpdateUserInterface } from "../types";

let token: string | null;

const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const getUser = async (id: string) => {
    const config = {
        headers: { Authorization: token }
    };
    if (!token) {
        return null;
    }

    const res = await api.get<BackendUserInterface>(`${baseUrl}/${id}`, config);
    return res.data;
};

const register = async (newUser: object) => {
    const res = await api.post(baseUrl, newUser);
    return res.data;
};

const update = async (obj: UpdateUserInterface) => {
    const config = {
        headers: { Authorization: token }
    };
    if (!token) {
        return null;
    }
    return api.put(`${baseUrl}/${obj.id}`, obj, config);
};

const remove = async (id: string) => {
    const config = {
        headers: { Authorization: token }
    };
    if (!token) {
        return null;
    }
    return api.delete(`${baseUrl}/${id}`, config);
};

export default { setToken, getUser, register, update, remove };
