import api from "./api";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("");
}

export const getReservas = async (data) => {
    const ejemplo = {};
    //console.log("API")
    /*const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log(formatDate(today))*/
    //console.log(data)
    let stringDate1 = "";
    let stringDate2 = "";
    if (data.fechaDesde) {
        const date1 = moment(data.fechaDesde).toDate();
        stringDate1 = formatDate(date1);
        //console.log(stringDate1)
    }
    if (data.fechaHasta) {
        const date2 = moment(data.fechaHasta).toDate();
        stringDate2 = formatDate(date2);
        //console.log(stringDate2)
    }
    data.fechaDesde ? (ejemplo["fechaDesdeCadena"] = stringDate1) : null;
    data.fechaHasta ? (ejemplo["fechaHastaCadena"] = stringDate2) : null;
    data.empleado
        ? (ejemplo["idEmpleado"] = { idPersona: data.empleado })
        : null;
    data.cliente ? (ejemplo["idCliente"] = { idPersona: data.cliente }) : null;
    //console.log(JSON.stringify(ejemplo));
    try {
        //console.log("Intentando traer reservas");
        const response = await api.get("stock-nutrinatalia/reserva", {
            params: { ejemplo: JSON.stringify(ejemplo) },
        });
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteReserva = async (id, userData) => {
    //console.log(id);
    //console.log(userData.usuarioLogin);
    try {
        const response = await api.delete(`stock-nutrinatalia/reserva/${id}`, {
            headers: { usuario: userData.usuarioLogin },
        });
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateReserva = async (pre, userData) => {
    //console.log(pre);
    //console.log(userData.usuarioLogin);
    const data = {
        idReserva: pre.idReserva,
        observacion: pre.observacion,
        flagAsistio: pre.flagAsistio,
    };
    //console.log(data);
    try {
        const response = await api.put("stock-nutrinatalia/reserva", data, {
            headers: { usuario: userData.usuarioLogin },
        });
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getReservasPrueba = () => {
    return {
        lista: [
            {
                id: 1,
                fechaCadena: "20190903",
                horaInicioCadena: "1000",
                horaFinCadena: "1015",
                idEmpleado: {
                    idPersona: 1,
                },
                idCliente: {
                    idPersona: 23,
                },
            },
            {
                id: 2,
                fechaCadena: "20200903",
                horaInicioCadena: "1000",
                horaFinCadena: "1030",
                idEmpleado: {
                    idPersona: 1,
                },
                idCliente: {
                    idPersona: 23,
                },
            },
        ],
        totalDatos: 2,
    };
};

export const postReserva = async (data) => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    delete data.idReserva;
    //console.log(user);
    //console.log(data);
    try {
        const response = await api.post("stock-nutrinatalia/reserva", data, {
            headers: { usuario: user.usuarioLogin },
        });
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getAgenda = async (data) => {
    let stringDate = "";
    const date = moment(data.fecha).toDate();
    stringDate = formatDate(date);
    try {
        //console.log("Intentando traer agenda");
        const response = await api.get(
            "stock-nutrinatalia/persona/" + data.doctor.idPersona + "/agenda",
            {
                params: { fecha: stringDate, disponible: "S" },
            }
        );
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const obtenerEmpleados = async () => {
    try {
        const response = await api.get("stock-nutrinatalia/persona", {
            params: {
                ejemplo: JSON.stringify({ soloUsuariosDelSistema: true }),
            },
        });
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
