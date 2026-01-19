import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { Dispatch, RefObject, SetStateAction } from "react";
import AddNewProductButton from "./AddNewProductButton";

interface IFilterAndAddActions {
  inputRef: RefObject<HTMLInputElement | null>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onClearFilter: () => void;
}

function FilterAndAddActions({
  inputRef,
  searchQuery,
  setSearchQuery,
  onClearFilter,
}: IFilterAndAddActions) {
  return (
    <div className="flex justify-between mb-4 gap-4">
      <div className="relative flex-1 max-w-md group">
        <MagnifyingGlassIcon
          className={clsx(
            "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4",
            "text-indigo-400 group-focus-within:text-indigo-600 transition-colors cursor-pointer",
          )}
          aria-label="Search Query Icon"
          onClick={() => inputRef.current?.focus()}
        />
        <input
          type="text"
          ref={inputRef}
          placeholder="Search products..."
          aria-label="Search Query"
          className={clsx(
            "w-full pl-8 md:pl-10 pr-4 py-2.5 font-medium rounded-xl shadow-sm transition-all",
            "border outline-none border-indigo-100 bg-white text-gray-700",
            "placeholder:text-gray-400 hover:border-indigo-200",
            "focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/5",
          )}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery ? (
          <Cross1Icon
            tabIndex={0}
            role="button"
            onKeyDown={onClearFilter}
            className={clsx(
              "absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4",
              "text-indigo-400 group-focus-within:text-indigo-600 transition-colors cursor-pointer",
            )}
            onClick={onClearFilter}
            aria-label="Clear Search Query"
          />
        ) : null}
      </div>
      <AddNewProductButton />
    </div>
  );
}

export default FilterAndAddActions;
