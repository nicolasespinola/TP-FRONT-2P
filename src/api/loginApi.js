import api from "./api";

export const getUsuariosDelSistema = async () => {
    const ejemplo = {};
    ejemplo["soloUsuariosDelSistema"] = null;
    try {
        const response = await api.get("stock-nutrinatalia/persona", {
            params: { ejemplo: JSON.stringify(ejemplo) },
        });
        return Promise.resolve(response.data);
    } catch (err) {
        Promise.reject(err);
    }
};
