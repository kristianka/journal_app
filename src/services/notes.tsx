import api from "../api";
const baseUrl = "api/notes";
import { CreateNoteInterface, NoteInterface, UpdateNoteInterface } from "../types";

let token: string | null;

const setToken = (newToken: string) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    const config = {
        headers: { Authorization: token }
    };
    if (!token) {
        return null;
    }
    const res = await api.get<NoteInterface[]>(baseUrl, config);
    return res.data;
};

const create = (newObject: CreateNoteInterface) => {
    const config = {
        headers: { Authorization: token }
    };
    return api.post(baseUrl, newObject, config);
};

const update = (obj: UpdateNoteInterface) => {
    const config = {
        headers: { Authorization: token }
    };
    return api.put(`${baseUrl}/${obj.id}`, obj, config);
};

const remove = (id: string) => {
    const config = {
        headers: { Authorization: token }
    };
    return api.delete(`${baseUrl}/${id}`, config);
};

const getById = (id: string) => {
    const config = {
        headers: { Authorization: token }
    };
    return api.get(`${baseUrl}/${id}`, config).then((response) => response.data);
};

export default { getAll, create, update, remove, setToken, getById };
