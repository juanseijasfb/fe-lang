import { AppStore } from '@/types/storeTypes'
import { StoreApi, UseBoundStore, create } from 'zustand'

export const useAppStore: UseBoundStore<StoreApi<AppStore>> = create((set) => ({
  selectedLang: "en",
  appLockedLoad: false,
  appLockedLoadMessage: "",
  planSvcMainPort: 5001,
  isAdm: false,
  openSideBar: false,
  setAppLockedLoadMessage: (message) => set(() => ({ 
    appLockedLoadMessage: message,
  })), 
  setOpenSideBar: (open) => set(() => ({ 
    openSideBar: open,
  })), 
  setIsAdm: (adm) => set(() => ({ 
    isAdm: adm,
  })), 
  setPlanSvcMainPort: (newPort) => set(() => ({ 
    planSvcMainPort: newPort
  })),
  setAppLockedLoad: (locked) => set(() => ({ 
    appLockedLoad: locked
  })),
  setSelectedLang: (newLang) => set(() => ({ 
    selectedLang: newLang
  })),
}))