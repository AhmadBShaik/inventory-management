"use client"

import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";

interface ShowModalType {
  show: null | 'new' | number;
  setShow: Dispatch<SetStateAction<null | 'new' | number>>
}

export const ShowModalContext = createContext<ShowModalType | undefined>(undefined)

export const useShowModal = () => {
  const context = useContext(ShowModalContext)
  if (context === undefined) {
    throw new Error("useShowModal must be used inside ShowModalProvider.")
  }
  return context
}

export const ShowModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState<null | 'new' | number>(null)
  const value = useMemo(() => {
    return {
      show, 
      setShow
    }
  }, [show])
  return <ShowModalContext.Provider value={value}>
    {children}
  </ShowModalContext.Provider>
}