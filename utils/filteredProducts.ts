import { Product } from "@/app/types";

export const getFilteredProducts = (products: Array<Product>, searchQuery: string) => {
  if (!searchQuery.trim()) return products;

  const lowerQuery = searchQuery.toLowerCase();

  return products.filter((item) =>
    item.name.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.tags?.some(tag =>
      tag.toLowerCase().includes(lowerQuery)
    )
  );
}