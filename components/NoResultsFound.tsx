import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import AddNewProductButton from "./AddNewProductButton";
interface INoResultsFound {
  searchQuery: string;
  type: "empty" | "not-found";
  onClear: () => void;
}
const NoResultsFound = ({ onClear, searchQuery, type }: INoResultsFound) => {
  const content = {
    empty: {
      title: "Your inventory is empty",
      description:
        " Ready to get organized? Add your first product to start tracking your stock and categories.",
    },
    "not-found": {
      title: "No products found",
      description: `We couldn't find anything matching \"${searchQuery}\". Try adjusting your filters or search terms.`,
    },
  };
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50/50 rounded-3xl border-2 border-dashed border-indigo-100">
      <div className="bg-indigo-100 p-4 rounded-full mb-4">
        <MagnifyingGlassIcon className="w-8 h-8 text-indigo-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">
        {content[type].title}
      </h3>
      <p className="text-gray-500 text-center max-w-xs mb-6">
        {content[type].description}
      </p>
      {type === "empty" ? (
        <AddNewProductButton />
      ) : (
        <button
          onClick={onClear}
          className="text-indigo-600 font-medium hover:text-indigo-700 underline-offset-4 hover:underline cursor-pointer"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

export default NoResultsFound;
