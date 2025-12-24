import { useShowModal } from '@/app/context/modal';
import { Product } from '@/app/types';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import { Drawer, Descriptions, Tag, Divider, Button, Statistic, Space } from 'antd';

const ProductDetailsDrawer = ({ product, visible, onClose, showActions }: { product: Product, visible: boolean, onClose: () => void, showActions?: boolean }) => {

  const { setShow } = useShowModal()

  if (!product) return null;

  return (
    <Drawer
      title={`Product Details: ${product.name}`}
      placement="right"
      size={500}
      onClose={onClose}
      open={visible}
      footer=
      {showActions && (
        <>
          <div className="flex gap-3 mt-8">
            <button
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-100 transition-all hover:bg-indigo-600 hover:text-white active:scale-95 cursor-pointer"
              title="Edit Product"
              onClick={
                () => setShow(product.id)
              }
            >
              <Pencil2Icon className="w-4 h-4" />
              Edit Product
            </button>
          </div>
        </>
      )
      }
    >
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Statistic title="Current Price" value={product.price} prefix="₹" suffix="/-" />
        <Statistic
          title="Stock Level"
          value={product.stock}
          styles={{
            content: {
              color: product.stock < 10 ? 'red' : '#3f8600'
            }
          }}
        />
      </div>

      <Divider />
      <Descriptions title="Specifications" column={1} bordered size="small">
        <Descriptions.Item label="Category">{product.category}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={product.isActive ? 'green' : 'red'}>
            {product.isActive ? 'ACTIVE ON STORE' : 'HIDDEN'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Created">{new Date(product.createdAt).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="Tags">
          <div className="flex flex-wrap gap-2">
            {product.tags.map(tag => (
              <Tag key={tag} color='blue' className="m-0">
                {tag}
              </Tag>
            ))}
          </div>
        </Descriptions.Item>
      </Descriptions>

      <div className="mt-8">
        <h4 className="text-sm font-bold text-gray-400 uppercase mb-2">Full Description</h4>
        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
          {product.description}
        </p>
      </div>
    </Drawer>
  );
};

export default ProductDetailsDrawer