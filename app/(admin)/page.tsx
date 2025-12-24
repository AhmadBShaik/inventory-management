"use client"

import { useProducts } from "../context/products";
import ViewToggle from "@/components/ToggleGroup";
import Container from "@/components/Container";
import TableView from "@/components/TableView";
import GridView from "@/components/GridView";
import ProductModal from "@/components/ProductFormModal";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import { useShowModal } from "../context/modal";

export default function Home() {
  const { products, view } = useProducts()
  const {show, setShow} = useShowModal()
  return (
    <div>
      <Container>
        <h1 className="text-center text-2xl font-bold mt-5">Inventory Management</h1>
        <div className="flex justify-end w-full mb-4 md:mb-6">
          <ViewToggle />
        </div>
        <div className="flex justify-between mb-4 gap-4">
          <div className="relative flex-1 max-w-md group">
            <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-700 font-medium rounded-xl border border-indigo-100 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/5 hover:border-indigo-200 shadow-sm"
            />
          </div>
          <button
            className="w-fit flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-100 transition-all hover:bg-indigo-600 hover:text-white active:scale-95 cursor-pointer"
            title="Add New Product"
            onClick={() => {
              setShow('new')
            }}
          >
            <PlusIcon className="w-4 h-4 stroke-2" />
            Add New Product
          </button>

        </div>
        <div>{view === 'grid' ?
          <GridView products={products} />
          : <TableView products={products} />}</div>
        <ProductModal productId={show} onClose={() => {setShow(null)}} />
      </Container>

    </div>
  );
}
