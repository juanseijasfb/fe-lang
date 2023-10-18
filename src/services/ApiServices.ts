const ROOT_URL_5000 = "https://fleetbooster.net:5000";

export const getCarriersList = async (carrierName = "") => {
    return fetch(`${ROOT_URL_5000}/getCarriersList?carrier=${carrierName}`, {
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
    return fetch(`${ROOT_URL_5000}/addDriver`, {
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
    return fetch(`${ROOT_URL_5000}/getDispatcher?dispatcher=${userEmail}`, {
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
    return fetch(`${ROOT_URL_5000}/addCarrier`, {
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
    return fetch(`${ROOT_URL_5000}/addDispatcher`, {
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

export const getBrokerDetails = async (brokerMc = "") => {
    return fetch(`${ROOT_URL_5000}/getBroker?MCNumber=${brokerMc}`, {
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

export const addRestriction = async (
    {
        subject = "D",
        type, // CI, ST, B
        subjectValue, // driver name
        typeValue,
    }
) => {
    // dispatcher debe venir como parametro, pero no esta definido como.
    return fetch(`${ROOT_URL_5000}/addRestriction?subject=${subject}&type=${type}&subjectValue=${subjectValue}&typeValue=${typeValue}&validUntil=2099-12-31 00:00:00`,
        {
            headers: {
                Accept: "text/html; charset=utf-8",
                "Content-Type": "text/html; charset=utf-8",
            },
        })
        .then((x) => x.json())
        .then((res) => res)
        .catch(() => {
            throw new Error();
        });
};

export const addBroker = async ({ MCNumber, brokerName }) => {
    return fetch(`${ROOT_URL_5000}/addBroker`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: new URLSearchParams({
            "mcNumber": MCNumber,
            "brokerName": brokerName,
        })
    })
        .then((x) => x.json())
        .then((res) => res)
        .catch(() => {
            throw new Error("Hubo un error al intentar crear el broker.");
        })
};


export const deleteDispatcher = async () => {
    return "ok";
    // return fetch(`${ROOT_URL_5000}/addBroker`, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //     },
    //     body: new URLSearchParams({
    //         "mcNumber": MCNumber,
    //         "brokerName": brokerName,
    //     })
    // })
    //     .then((x) => x.json())
    //     .then((res) => res)
    //     .catch((err) => {
    //         throw new Error("Hubo un error al intentar crear el broker.");
    //     })
};


export const removeRestriction = async (
    {
        subject, // D, C
        type, // CI, ST, B
        subjectValue, // driver name
        typeValue,
    }
) => {

    return fetch(`${ROOT_URL_5000}/removeRestriction?subject=${subject}&type=${type}&subjectValue=${subjectValue}&typeValue=${typeValue}`,
        {
            headers: {
                Accept: "text/html; charset=utf-8",
                "Content-Type": "text/html; charset=utf-8",
            },
        })
        .then((x) => x.text())
        .then((res) => res)
        .catch(() => {
            throw new Error("Hubo un error al intentar remover la restriccion.");
        });
};

export const getRestrictions = async ({ carrier, driverName }) => {
    return fetch(`${ROOT_URL_5000}/getRestrictions?carrier=${carrier}&driver=${driverName}`, {
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

export const getBrokerRestrictionDetails = async (brokerMcList = "") => {
    return fetch(`${ROOT_URL_5000}/getBrokerList?MCNumbers=${brokerMcList}`, {
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
