import { Product } from '@/app/types';
import { Table, Tag, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  EyeOpenIcon,
  Pencil2Icon,
  TrashIcon
} from "@radix-ui/react-icons";

import productData from '../public/data.json'
import { formatCurrency } from '@/utils/currencyFormatter';
import ProductDetailsDrawer from './ProductDrawer';
import { useState } from 'react';
import { useShowModal } from '@/app/context/modal';
const uniqueCategories = Array.from(new Set((productData as Array<Product>).map(p => p.category)));

const Actions = ({ product }: { product: Product }) => {
  const [showDetails, setShowDetails] = useState(false);
  const { setShow } = useShowModal()
  const btnBase = "p-2 rounded-lg transition-all active:scale-90 flex items-center justify-center";

  return (
    <div>
      <div className='flex gap-2'>
        <button
          className={`${btnBase} bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white`}
          title='View Product'
          onClick={() => setShowDetails(true)}
        >
          <EyeOpenIcon className='w-4 h-4' />
        </button>
        <button
          className={`${btnBase} bg-gray-100 text-indigo-600 hover:bg-indigo-600 hover:text-white`}
          title='Edit Product'
          onClick={() => {
            setShow(product.id)
          }}
        >
          <Pencil2Icon className='w-4 h-4' />
        </button>
      </div>
      <ProductDetailsDrawer product={product} visible={showDetails} onClose={() => setShowDetails(false)} />
    </div>
  );
};
export const productColumns: ColumnsType<Product> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'start',
    width: 250,
    render: (text) => (
      <div className="flex flex-col">
        <span className="font-bold text-gray-900 leading-none">{text}</span>
      </div>
    ),
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text) => (
      <span className='text-[11px] font-bold uppercase tracking-wider text-violet-700 px-2 py-1 bg-violet-50 rounded-md border border-violet-100'>
        {text}
      </span>
    ),
    filters: uniqueCategories.map(category => ({ text: category, value: category })),
    onFilter: (value, record) => record.category === value,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (value) => <span className="font-mono font-semibold text-gray-900">{formatCurrency(value)}</span>,
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    key: 'stock',
    render: (stock) => (
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${stock < 10 ? 'bg-red-500' : 'bg-green-500'}`} />
        <span className={`text-sm ${stock < 10 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
          {stock} units
        </span>
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
    width: 120,
    render: (isActive: boolean) => (
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${!isActive ? 'bg-red-500' : 'bg-green-500'}`} />
        <span className={`text-sm ${!isActive ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    ),
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags: string[]) => (
      <div className='flex gap-1'>
        {tags.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag.toUpperCase()}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',

    render: (date) => <div className='text-gray-600 text-sm'>{new Date(date).toLocaleDateString()}</div>,
  },
  {
    title: '',
    dataIndex: 'actions',
    key: 'actions',
    render: (_, product) => <Actions product={product} />,
    fixed: 'end'
  },
];

const TableView = ({ products }: { products: Array<Product> }) => {
  return (<Table
    dataSource={products}
    columns={productColumns}
    rowKey="id"
    scroll={{ x: 'max-content' }}
    pagination={{
      pageSize: 8,
      placement: ['bottomCenter'],
      showSizeChanger: false,
      className: 'custom-pagination'
    }}
    size="middle"
    className='mb-5'
  />)

}


export default TableView