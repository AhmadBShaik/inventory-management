"use client";

import Container from "@/components/Container";
import FilterAndAddActions from "@/components/FilterAndAddActions";
import GridView from "@/components/GridView";
import NoResultsFound from "@/components/NoResultsFound";
import ProductModal from "@/components/ProductFormModal";
import TableView from "@/components/TableView";
import ViewToggle from "@/components/ToggleGroup";
import { useDeboucedValue } from "@/hooks";
import { getFilteredProducts } from "@/utils/filteredProducts";
import { useMemo, useRef, useState } from "react";
import { useShowModal } from "../context/modal";
import { useProducts } from "../context/products";

export default function Home() {
  const { products, view } = useProducts();
  const { show, setShow } = useShowModal();

  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useDeboucedValue(searchQuery);

  const filteredProducts = useMemo(
    () => getFilteredProducts(products, debouncedSearchQuery),
    [products, debouncedSearchQuery],
  );

  const handleClearFilter = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
    inputRef.current?.focus();
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  let content;

  if (!products.length) {
    content = (
      <NoResultsFound
        searchQuery={searchQuery}
        onClear={handleClearFilter}
        type="empty"
      />
    );
  } else if (!filteredProducts.length) {
    content = (
      <NoResultsFound
        searchQuery={searchQuery}
        onClear={handleClearFilter}
        type="not-found"
      />
    );
  } else {
    content =
      view === "grid" ? (
        <GridView products={filteredProducts} />
      ) : (
        <TableView products={filteredProducts} />
      );
  }
  return (
    <main>
      <Container>
        <h1 className="text-center text-2xl font-bold mt-5">
          Inventory Management
        </h1>
        <div className="flex justify-end w-full mb-4 md:mb-6">
          <ViewToggle />
        </div>
        <FilterAndAddActions
          inputRef={inputRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClearFilter={handleClearFilter}
        />

        {content}

        <ProductModal
          productId={show}
          onClose={() => {
            setShow(null);
          }}
        />
      </Container>
    </main>
  );
}
