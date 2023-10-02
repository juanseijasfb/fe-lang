import { AppStore } from '@/types/storeTypes'
import { StoreApi, UseBoundStore, create } from 'zustand'

export const useAppStore: UseBoundStore<StoreApi<AppStore>> = create((set) => ({
  selectedLang: "es",
  appLockedLoad: false,
  appLockedLoadMessage: "",
  planSvcMainPort: 5001,
  isAdm: false,
  openSideBar: false,
  snackbar: {
    type: "",
    message: "",
    openSnackbar: false,
    severity: 'success',
    vertical: 'bottom',
    horizontal: 'right',
    autoHide: 6000,
  },
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
  setSnackbar: (newSnackbar) => set((state) => ({ 
    snackbar:  {...state.snackbar, ...newSnackbar} 
  })),
  setSelectedLang: (newLang) => set(() => ({ 
    selectedLang: newLang
  })),
}))