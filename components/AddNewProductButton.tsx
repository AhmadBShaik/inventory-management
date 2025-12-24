import { useShowModal } from "@/app/context/modal"
import { PlusIcon } from "@radix-ui/react-icons"

const AddNewProductButton = () => {
  const { setShow } = useShowModal()

  return <button
    className="w-fit flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-100 transition-all hover:bg-indigo-600 hover:text-white active:scale-95 cursor-pointer"
    title="Add New Product"
    onClick={() => {
      setShow('new')
    }}
  >
    <PlusIcon className="w-4 h-4 stroke-2" />
    Add New Product
  </button>
}

export default AddNewProductButton