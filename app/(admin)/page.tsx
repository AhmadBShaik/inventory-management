"use client";

import Container from "@/components/Container";
import FilterAndAddActions from "@/components/FilterAndAddActions";
import NoResultsFound from "@/components/NoResultsFound";
import ProductModal from "@/components/ProductFormModal";
import ViewToggle from "@/components/ToggleGroup";
import { useDeboucedValue } from "@/hooks";
import { getFilteredProducts } from "@/utils/filteredProducts";
import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { useShowModal } from "../context/modal";
import { useProducts } from "../context/products";

const wait = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

const GridView = lazy(() =>
  wait(1000).then(() => import("@/components/GridView")),
);

const TableView = lazy(() =>
  wait(1000).then(() => import("@/components/TableView")),
);

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
        <Suspense fallback={<p>Loading Grid View</p>}>
          <GridView products={filteredProducts} />
        </Suspense>
      ) : (
        <Suspense fallback={<p>Loading Table View</p>}>
          <TableView products={filteredProducts} />
        </Suspense>
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
