import { AlertColor } from "@mui/material"

export type RestrictionPayload = {
    subject: string,
    type: string,
    subjectValue: string,
    typeValue: string,
}

export interface DriverRestrictionsConfiguration {
    [driverId: number]: DriverRestrictions;
}

export type DriverRestrictions = {
    city: string[],
    broker: string[],
    state: string[],
}

export type ModalContent = {
    title: string,
    content: any,
    hideConfirm?: boolean,
    confirmText?: string,
    cancelText?: string,
    handleClose?: () => void,
    handleConfirm?: () => void,
}


export type ContextMenu = {
    mouseX: number;
    mouseY: number;
}

export type TConfirmationModal = {
    open?: boolean;
    title?: string;
    content?: JSX.Element | JSX.Element[] | string;
    handleConfirm?: () => void;
    handleClose?: () => void;
}


export type RouteTableProps = {
    rows: any[]
    sortKey: string
    visibilityKey: string
}
