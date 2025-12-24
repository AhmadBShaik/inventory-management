"use client"

import { useProducts } from "../context/products";
import ViewToggle from "@/components/ToggleGroup";
import Container from "@/components/Container";
import TableView from "@/components/TableView";
import GridView from "@/components/GridView";
import ProductModal from "@/components/ProductFormModal";
import { Cross1Icon, MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import { useShowModal } from "../context/modal";
import { useMemo, useRef, useState } from "react";
import { getFilteredProducts } from "@/utils/filteredProducts";
import { useDeboucedValue } from "@/hooks";
import AddNewProductButton from "@/components/AddNewProductButton";

export default function Home() {
  const { products, view } = useProducts()
  const { show, setShow } = useShowModal()

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useDeboucedValue(searchQuery)
  const filteredProducts = useMemo(() => getFilteredProducts(products, debouncedSearchQuery), [products, debouncedSearchQuery])
  const handleClearFilter = () => {
    setSearchQuery('')
    setDebouncedSearchQuery('')
  }
  const inputRef = useRef<HTMLInputElement | null>(null)
  return (
    <div>
      <Container>
        <h1 className="text-center text-2xl font-bold mt-5">Inventory Management</h1>
        <div className="flex justify-end w-full mb-4 md:mb-6">
          <ViewToggle />
        </div>
        <div className="flex justify-between mb-4 gap-4">
          <div className="relative flex-1 max-w-md group">
            <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 group-focus-within:text-indigo-600 transition-colors cursor-pointer"
              aria-label="Search Query Icon"
              onClick={() => inputRef.current?.focus()} />
            <input
              type="text"
              ref={inputRef}
              placeholder="Search products..."
              aria-label="Search Query"
              className="w-full pl-8 md:pl-10 pr-4 py-2.5 bg-white text-gray-700 font-medium rounded-xl border border-indigo-100 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/5 hover:border-indigo-200 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ?
              <Cross1Icon className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 group-focus-within:text-indigo-600 transition-colors cursor-pointer" onClick={handleClearFilter}
                aria-label="Clear Search Query"
              /> : null
            }
          </div>
          <AddNewProductButton />
        </div>
        {
          !products.length ?
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 rounded-3xl border-2 border-dashed border-indigo-100">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <MagnifyingGlassIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Your inventory is empty</h3>
              <p className="text-gray-500 text-center max-w-xs mb-6">
                Ready to get organized? Add your first product to start tracking your stock and categories.
              </p>

              <AddNewProductButton />
            </div>
            :
            <>
              {filteredProducts.length ?
                <div>{view === 'grid' ?
                  <GridView products={filteredProducts} />
                  : <TableView products={filteredProducts} />}</div>
                : <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 rounded-3xl border-2 border-dashed border-indigo-100">
                  <div className="bg-indigo-100 p-4 rounded-full mb-4">
                    <MagnifyingGlassIcon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
                  <p className="text-gray-500 text-center max-w-xs mb-6">
                    We couldn't find anything matching "{searchQuery}". Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={handleClearFilter}
                    className="text-indigo-600 font-medium hover:text-indigo-700 underline-offset-4 hover:underline cursor-pointer"
                  >
                    Clear all filters
                  </button>
                </div>
              }
            </>

        }

        <ProductModal productId={show} onClose={() => { setShow(null) }} />
      </Container>

    </div>
  );
}
