import { 
    CarrierCreateData,
    DispatcherCreateData, Driver, Restriction, 
} from "@/utils/types";
import { toast } from "react-toastify";

const BASE_URL = "https://fleetbooster.net:5000";

export const getCarriers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/getCarriersList?carrier=`);
        const data = await response.json();
        return data;
    } catch (error) {
        return [];
    }
}

export const getDispatcher = async (email: string) => {
    try {
        const response = await fetch(`https://fleetbooster.net:5000/getDispatcher?dispatcher=${email}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createDriver = async (driver: Driver) => {
    try {
        const x = await fetch(`${BASE_URL}/addDriver`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                "firstName": driver.firstName,
                "lastName": driver.lastName,
                "mcNumber": driver.mcNumber,
                "carrierName": driver.carrierName,
                "trailerType": driver.trailerType,
                "maxWeight": driver.maxWeight,
            })
        });
        const res = await x.json();
        return res;
    } catch (err) {
        throw new Error("Hubo un error al intentar crear el driver.");
    }

}

export const createDispatcher = async (dispatcher: DispatcherCreateData) => {
    try {
        const x = await fetch(`${BASE_URL}/addDispatcher`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                dispatcherEmail: dispatcher.dispatcherEmail,
                role: dispatcher.role,
                port: dispatcher.port.toString(),
                enabled: dispatcher.enabled.toString(),
            })
        });
        const res = await x.json();
        return res;
    } catch (err) {
        throw new Error("Hubo un error al intentar crear el carrier.");
    }
}

export const createCarrier = async (carrier: CarrierCreateData) => {
    try {
        const x = await fetch(`${BASE_URL}/addCarrier`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                mcNumber: carrier.mcNumber,
                carrierName: carrier.carrierName,
            })
        });
        const res = await x.json();
        return res;
    } catch (err) {
        throw new Error("Hubo un error al intentar crear el carrier.");
    }
}

export const getBroker = async (brokerMc: string) => {
    try {
        const x = await fetch(`${BASE_URL}/getBroker?MCNumber=${brokerMc}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await x.json();
        if (res.msg) throw new Error(res.msg);
        return res;
    } catch (err: any) {
        toast.error("No se encontró el broker.");
        return null
    }
}

export const getBrokerDetails = async (brokerMc: string[]) => {
    try {
        const x = await fetch(`${BASE_URL}/getBrokerList?MCNumbers=${brokerMc.join(",")}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await x.json();
        if (res.msg) throw new Error(res.msg);
        return res;
    } catch (err: any) {
        return null
    }
}

export const addBroker = async (mcNumber: string, brokerName: string) => {
    try {
        const x = await fetch(`${BASE_URL}/addBroker`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: new URLSearchParams({
                "mcNumber": mcNumber.toString(),
                "brokerName": brokerName,
            })
        });
        const res = await x.json();
        return res;
    } catch (err) {
        throw new Error("Hubo un error al intentar crear el broker.");
    }
}


export const addRestriction = async ({ subject, type, subjectValue, typeValue }: Restriction) => {
    try {
        const x = await fetch(`${BASE_URL}/addRestriction?subject=${subject}&type=${type}&subjectValue=${subjectValue}&typeValue=${typeValue}&validUntil=2099-12-31 00:00:00`,
            {
                headers: {
                    Accept: "text/html; charset=utf-8",
                    "Content-Type": "text/html; charset=utf-8",
                },
            });
        const res = await x.json();
        return res;
    } catch (err) {
        throw new Error();
    }
}

export const removeRestriction = async ({ subject, type, subjectValue, typeValue }: Restriction) => {
    try {
        const x = await fetch(`${BASE_URL}/removeRestriction?subject=${subject}&type=${type}&subjectValue=${subjectValue}&typeValue=${typeValue}`,
            {
                headers: {
                    Accept: "text/html; charset=utf-8",
                    "Content-Type": "text/html; charset=utf-8",
                },
            });
        const res = await x.text();
        return res;
    } catch (err) {
        throw new Error("Hubo un error al intentar remover la restriccion.");
    }
}

export const getRestrictions = async (carrier: string, driverName?: string) => {
    try {
        const x = await fetch(`${BASE_URL}/getRestrictions?carrier=${carrier}&driver=${driverName}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        const res = await x.json();
        return res;
    } catch {
        throw new Error();
    }
}