"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import productsData from "../../public/data.json";
import { Product } from "../types";

interface ProductsContextType {
  products: Array<Product>;
  setProducts: Dispatch<SetStateAction<Product[]>>;
  view: "grid" | "table";
  setView: (view: "grid" | "table") => void;
}
export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used inside ProductsProvider.");
  }
  return context;
};

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<Array<Product>>(
    () => productsData as Array<Product>,
  );
  const [view, setView] = useState<"grid" | "table">("grid");
  const value = useMemo(
    () => ({
      products,
      setProducts,
      view,
      setView,
    }),
    [products, view],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
