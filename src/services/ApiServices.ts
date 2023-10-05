const BASE_URL = "https://fleetbooster.net:5000";

export const getCarriersList = async (carrierName = "") => {
    return fetch(`${BASE_URL}/getCarriersList?carrier=${carrierName}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((x) => x.json())
        .then((res) => res)
        .catch(() => {
            throw new Error()
        });
};

export const createDriver = async (payload) => {
    return fetch(`${BASE_URL}/addDriver`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
            "firstName": payload.firstName,
            "lastName": payload.lastName,
            "mcNumber": payload.mcNumber,
            "carrierName": payload.carrierName,
            "trailerType": payload.trailerType,
            "maxWeight": payload.maxWeight,
        })
    })
        .then((x) => x.json())
        .then((res) => res)
        .catch(() => {
            throw new Error("Hubo un error al intentar crear el driver.");
        })
};

export const getDispatcher = async (userEmail) => {
    return fetch(`${BASE_URL}/getDispatcher?dispatcher=${userEmail}`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((x) => x.json())
        .then((res) => res)
        .catch(() => {
            throw new Error()
        });
};

export const addCarrier = async (payload) => {
    return fetch(`${BASE_URL}/addCarrier`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
            "mcNumber": payload.mcNumber,
            "carrierName": payload.carrierName,
        })
    })
        .then((x) => x.json())
        .then((res) => res)
        .catch(() => {
            throw new Error("Hubo un error al intentar crear el carrier.");
        })
};

export const addDispatcher = async (payload) => {
    return fetch(`${BASE_URL}/addDispatcher`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
            "dispatcherEmail": payload.dispatcherEmail,
            "role": payload.role,
            "enabled": payload.enabled === "true" ? "1" : "0",
            "port": payload.port,
        })
    })
        .then((x) => x.json())
        .then((res) => res)
        .catch(() => {
            throw new Error("Hubo un error al intentar crear el carrier.");
        })
};