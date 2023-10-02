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