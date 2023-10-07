export enum Role {
    ADMIN = 'A',
}

export const TypeRestriction: Record<string, string> = {
    broker: 'B',
}


export enum Restriction {
    Broker = 'B',
    Carrier = 'C',
    Dispatcher = 'D',
    Driver = 'R',
}

export const STATES_LIST = [
    "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA",
    "ID", "IL", "IN", "IA", "KS", "KY", "LA", "MA", "ME", "MD",
    "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
    "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD",
    "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export const PaymentAmountTypeNames = {
    0: "Valor Real",
    1: "Basado en Historico",
    2: "Valor Calculado",
}

export const ReasonDeleteTrip = {
    1: { id : 1, value: "Not Available" },  // sold
    2: { id : 2, value: "Otros Motivos" } 
}
