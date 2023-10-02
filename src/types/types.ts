import { AlertColor } from "@mui/material"
import { DataGridProProps, GridCellParams, GridColumnVisibilityModel } from "@mui/x-data-grid-pro";

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

export type AppSnackbar = {
    type: string,
    message: string,
    openSnackbar: boolean,
    severity: AlertColor | undefined,
    vertical: 'top' | 'bottom',
    horizontal: 'left' | 'center' | 'right',
    autoHide: number | null | undefined,
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

export interface TableProps extends DataGridProProps {
    pageSize?: number
    contextItem?: JSX.Element | JSX.Element[] | undefined
    contextMenu?: ContextMenu | null
    open?: boolean | null
    openMenu?: (bool: boolean) => void,
    handleClose: () => void
    handleContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    orderKey: string
    clickFields?: string[]
    currentCell?: GridCellParams | null
    setCurrentCell?: (props: GridCellParams) => void
    fieldsData?: any,
    setSortModel?: (prop: any) => void,
    visibilityModel: GridColumnVisibilityModel
    loading?: boolean
    handleUpdateVisibilityModel: (visibilityObj: any) => void
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
