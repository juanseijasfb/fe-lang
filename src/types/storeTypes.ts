import { DriverRestrictionsConfiguration, ModalContent } from "./types"

export type RouteStore = {
    selectedRoute: any,
    routeSummaryRows: object,
    plainRouteDetails: object,
    rightClickRender: string,
    setSelectedRoute: (obj : object) => void,
    setRightClickRender: (newRender: string) => void,
    setRouteSummaryRows: (summaryRows: object) => void,  
    setPlainRouteDetails: (summaryRows: object) => void,  
}

export type AppStore = {
    selectedLang: string,
    appLockedLoad: boolean,
    planSvcMainPort: number,
    isAdm: boolean,
    openSideBar: boolean,
    appLockedLoadMessage: string,
    setAppLockedLoadMessage: (lockedLoadMessage: string) => void,
    setOpenSideBar: (isAdm: boolean) => void,
    setSelectedLang: (selectedLang: string) => void,
    setAppLockedLoad: (lockedLoad: boolean) => void,
    setPlanSvcMainPort: (usrPort: number) => void,
    setIsAdm: (isAdm: boolean) => void,
}

export type FormStore = {
    driverRouteFilters: object,
    loadingTrips: boolean,
    setDriverRouteFilters: (driverRouteFilters: object) => void,
    setLoadingTrips: (isLoading: boolean) => void,
}

export type GenericModalStore = {
    showGenericModal: boolean,
    isLoadingModal: boolean,
    modalContent: any,
    setIsLoadingModal: (isLoading: boolean) => void,
    setShowGenericModal: (open: boolean) => void,
    setModalContent: (content: ModalContent) => void,
}

export type HistoricDataStore = {
    sent: string,
    received: string,
    setSent: (data: string) => void,
    setReceived: (data: string) => void,
}

export type RestrictionStore = {
    driverRestrictions: DriverRestrictionsConfiguration | Object,
    setDriverRestrictions: (restrictions: DriverRestrictionsConfiguration) => void,
    blockPlan: boolean,
    setBlockPlan: (planBlocked: boolean) => void,
}
