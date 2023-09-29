import api from ".";

export const getUsersAsync = async () => {
    const res = await api.get("/users");
    return res.data;
};

export const createUserAsync = async (data) => {
    const res = await api.post("/users", data);
    return res.data;
}

export const updateUserAsync = async (id, data) => {
    const res = await api.put("/users/" + id, data);
    return res.data;
}

export const deleteUserAsync = async (id) => {
    const res = await api.delete("/users/" + id);
    return res.data;
}

export const findUserAsync = async (id) => {
    const res = await api.get("/users/" + id);
    return res.data;
}