export interface Carrier {
	MCNumber: number;
	carrier: string;
}
export interface Dispatcher {
	dispatcherId: number;
	dispatcher: string;
	role: string;
	enabled: number;
	port: number;
}

export interface DispatcherCreateData {
	dispatcherEmail: string;
	role: string;
	port: number;
	enabled: boolean;
}
export interface CarrierCreateData {
	carrierName: string;
	mcNumber: string;
}

export interface Driver {
	firstName: string;
	lastName: string;
	mcNumber: string;
	carrierName: string;
	trailerType: string;
	maxWeight: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	image: string;
}

export interface DriverCreateResponse {
	driverId: number;
}

export interface Broker {
	CompanyName: string;
	MCNumber: number;
}

export interface ErrorResponse {
	msg: string;
}

export interface Restriction {
	subject: string;
	type: string;
	subjectValue: string;
	typeValue: string;
}

export interface RestrictionResponse {
	Subject: string;
	Type: string;
	SubjectValue: string;
	TypeValue: string;
	ValidUntil: number;
}

export interface RestrictionDataTable {
	name: string;
	type: string;
	key: string;
}
