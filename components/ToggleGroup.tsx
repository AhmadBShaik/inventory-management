import { useProducts } from "@/app/context/products";
import {
  TableIcon,
  ViewGridIcon
} from "@radix-ui/react-icons";
import clsx from "clsx";
import { ToggleGroup } from "radix-ui";


const ViewToggle = () => {
  const { view, setView } = useProducts();
  return (
    <ToggleGroup.Root
      className="border border-gray-400 rounded-xl flex items-center justify-center w-fit p-1.5 gap-2"
      type="single"
      aria-label="View type"
      value={view}
      onValueChange={(value) => {
        if(value){
          setView(value as 'grid' | 'table')
        }
      }}
    >
      <ToggleGroup.Item
        value="grid"
        aria-label="Grid view"
        title="Grid View"
        tabIndex={0}
        className={clsx(
          "cursor-pointer p-2 bg-white text-gray-600 rounded-lg",
          "data-[state=on]:bg-violet-200 data-[state=on]:text-violet-900",
        )}
      >
        <ViewGridIcon width={20} height={20} />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="table"
        aria-label="Table view"
        title="Table View"
        tabIndex={0}
        className={clsx(
          "cursor-pointer p-2 bg-white text-gray-600 rounded-lg",
          "data-[state=on]:bg-violet-200 data-[state=on]:text-violet-900",
        )}
      >
        <TableIcon width={20} height={20} />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  )
}

export default ViewToggle;
