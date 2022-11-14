import moment from "moment";
import api from "./api";

export const getPacientes = async (data) => {
    const ejemplo = {};
    data.nombre ? (ejemplo["nombre"] = data.nombre) : null;
    data.apellido ? (ejemplo["apellido"] = data.apellido) : null;
    try {
        const response = await api.get("stock-nutrinatalia/persona", {
            params: { like: "S", ejemplo: JSON.stringify(ejemplo) },
        });
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const postPaciente = async (data) => {
    const date = moment(data.fechaNacimiento).toDate();
    const stringDate = `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //console.log({ ...data, fechaNacimiento: stringDate });
    try {
        const response = await api.post("stock-nutrinatalia/persona", {
            ...data,
            fechaNacimiento: stringDate,
        });
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deletePatient = async (id) => {
    try {
        const response = await api.delete(`stock-nutrinatalia/persona/${id}`);
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updatePatient = async (data) => {
    const date = moment(data.fechaNacimiento).toDate();
    const stringDate = `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    try {
        const response = await api.put("stock-nutrinatalia/persona", {
            ...data,
            fechaNacimiento: stringDate,
        });
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
