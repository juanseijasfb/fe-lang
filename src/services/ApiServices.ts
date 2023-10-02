import { 
    Broker, Carrier, CarrierCreateData, Dispatcher,
    DispatcherCreateData, Driver, DriverCreateResponse,
    ErrorResponse, Restriction, RestrictionResponse 
} from "@/utils/types";
import { toast } from "react-toastify";

export default class ApiService {
    // /getCarriersList?carrier=

    async getCarriers(): Promise<Carrier[]> {

        try {
            const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/getCarriersList?carrier=`);
            const data = await response.json();
            return data;
        } catch (error) {
            return [];
        }
    }

    async getDispatcher(email: string): Promise<Dispatcher | null> {
        try {
            const response = await fetch(`https://fleetbooster.net:5000/getDispatcher?dispatcher=${email}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    async createDriver(driver: Driver): Promise<DriverCreateResponse | string> {
        try {
            const x = await fetch(`${env.NEXT_PUBLIC_API_URL}/addDriver`, {
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

    async createDispatcher(dispatcher: DispatcherCreateData): Promise<string> {
        try {
            const x = await fetch(`${env.NEXT_PUBLIC_API_URL}/addDispatcher`, {
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
    async createCarrier(carrier: CarrierCreateData): Promise<string> {
        try {
            const x = await fetch(`${env.NEXT_PUBLIC_API_URL}/addCarrier`, {
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

    async getBroker(brokerMc: string): Promise<Broker | null> {
        try {
            const x = await fetch(`${env.NEXT_PUBLIC_API_URL}/getBroker?MCNumber=${brokerMc}`, {
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
    async getBrokerDetails(brokerMc: string[]): Promise<Broker[] | null> {
        try {
            const x = await fetch(`${env.NEXT_PUBLIC_API_URL}/getBrokerList?MCNumbers=${brokerMc.join(",")}`, {
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

    async addBroker(mcNumber: string, brokerName: string): Promise<string> {
        try {
            const x = await fetch(`${env.NEXT_PUBLIC_API_URL}/addBroker`, {
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




    async addRestriction({ subject, type, subjectValue, typeValue }: Restriction) {
        try {
            const x = await fetch(`${env.NEXT_PUBLIC_API_URL}/addRestriction?subject=${subject}&type=${type}&subjectValue=${subjectValue}&typeValue=${typeValue}&validUntil=2099-12-31 00:00:00`,
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

    async removeRestriction({ subject, type, subjectValue, typeValue }: Restriction) {
        try {
            const x = await fetch(`${env.NEXT_PUBLIC_API_URL}/removeRestriction?subject=${subject}&type=${type}&subjectValue=${subjectValue}&typeValue=${typeValue}`,
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

    async getRestrictions(carrier: string, driverName?: string): Promise<RestrictionResponse[]> {
        try {
            const x = await fetch(`${env.NEXT_PUBLIC_API_URL}/getRestrictions?carrier=${carrier}&driver=${driverName}`, {
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
}