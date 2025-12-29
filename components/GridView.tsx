import { Product } from "@/app/types";
import { Pagination, PaginationProps, } from "antd";
import { useState } from "react";

import { useCurrentPageNumber } from "@/app/context/currentPage";
import { formatCurrency } from "@/utils/currencyFormatter";
import {
  ArchiveIcon,
} from "@radix-ui/react-icons";
import { Badge } from "antd";
import clsx from "clsx";
import ProductDetailsDrawer from "./ProductDrawer";

const ProductCard = ({ product }: { product: Product }) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <div className="group relative bg-white border border-gray-200 rounded-2xl p-4 transition-all hover:shadow-xl hover:border-violet-300">
      <div className="absolute top-4 right-4">
        <Badge
          status={product.isActive ? "success" : "default"}
          text={product.isActive ? "Active" : "Inactive"}
          className="font-medium"
        />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 px-2 py-1 rounded-md">
        {product.category}
      </span>

      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-10">
          {product.description ?? "N/A"}
        </p>
      </div>
      <div className="mt-6 flex items-end justify-between border-t border-gray-100 pt-4">
        <div>
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
            <ArchiveIcon />
            <span className={product.stock < 10 ? "text-red-500 font-semibold" : ""}>
              {product.stock} in stock
            </span>
          </div>
        </div>

        <button
          className={clsx("bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold",
            "hover:bg-violet-600 transition-colors cursor-pointer")}
          onClick={() => setShowDetails(true)}>
          View Details
        </button>
      </div>

      <ProductDetailsDrawer product={product} visible={showDetails}
        onClose={() => setShowDetails(false)} showActions />
    </div>
  );
};
const GridView = ({ products }: { products: Array<Product> }) => {
  const { current, setCurrent} = useCurrentPageNumber()
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };
  const productFrom = (current - 1) * 8
  const productTo = productFrom + 8
  return <div className="space-y-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.slice(productFrom, productTo).map(product => (
        <ProductCard key={product.id} product={product} />
      ))}

    </div>
    <Pagination
      align="center" pageSize={8} current={current} onChange={onChange}
      total={products.length} className="custom-pagination" style={{ marginBottom: 20 }}
    />
  </div>
}
export default GridView;

