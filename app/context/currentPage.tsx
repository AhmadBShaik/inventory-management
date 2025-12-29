"use client"

import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";

interface CurrentPageType {
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>
}

export const CurrentPageContext = createContext<CurrentPageType | undefined>(undefined)

export const useCurrentPageNumber = () => {
  const context = useContext(CurrentPageContext)
  if (context === undefined) {
    throw new Error("useCurrentPageNumber must be used inside CurrentPageProvider.")
  }
  return context
}

export const CurrentPageProvider = ({ children }: { children: React.ReactNode }) => {
  const [current, setCurrent] = useState<number>(1)
  const value = useMemo(() => {
    return {
      current, setCurrent
    }
  }, [current])
  return <CurrentPageContext.Provider value={value}>
    {children}
  </CurrentPageContext.Provider>
}