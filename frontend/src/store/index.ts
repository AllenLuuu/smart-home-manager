import create from "zustand";
import { persist } from "zustand/middleware";

interface loginDateState {
  loginDate: Date | null;
  setLoginDate: (date: Date) => void;
  deleteLoginDate: () => void;
}

interface currentSiteState {
  currentSite: Site | null;
  setCurrentSite: (site: Site) => void;
  deleteCurrentSite: () => void;
}

interface currentRoomState {
  currentRoom: Room | null;
  setCurrentRoom: (room: Room) => void;
  deleteCurrentRoom: () => void;
}

export const useLoginDateStore = create<loginDateState>()(
  persist(
    (set) => ({
      loginDate: null,
      setLoginDate: (date: Date) => set({ loginDate: date }),
      deleteLoginDate: () => set({ loginDate: null }),
    }),
    {
      name: "loginDate",
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    }
  )
);

export const useCurrentSiteStore = create<currentSiteState>()(
  persist(
    (set) => ({
      currentSite: null,
      setCurrentSite: (site: Site) => set({ currentSite: site }),
      deleteCurrentSite: () => set({ currentSite: null }),
    }),
    {
      name: "currentSite",
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    }
  )
);

export const useCurrentRoomStore = create<currentRoomState>()(
  persist(
    (set) => ({
      currentRoom: null,
      setCurrentRoom: (room: Room) => set({ currentRoom: room }),
      deleteCurrentRoom: () => set({ currentRoom: null }),
    }),
    {
      name: "currentRoom",
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    }
  )
);
