import api from ".";

export const getProductsAsync = async (req = null) => {
    const params = req ? '?' + (Object.entries(req)
    .filter(([key, value]) => value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')) : '';

    const res = await api.get("/products" + params);
    return res.data;
};

export const createProductAsync = async (data) => {
    const res = await api.post("/products", data);
    return res.data;
}

export const updateProductAsync = async (id, data) => {
    const res = await api.put("/products/" + id, data);
    return res.data;
}

export const deleteProductAsync = async (id) => {
    const res = await api.delete("/products/" + id);
    return res.data;
}

export const findProductAsync = async (id) => {
    const res = await api.get("/products/" + id);
    return res.data;
}