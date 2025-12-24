import { App, Modal } from 'antd';
import { useState } from 'react';
import ProductForm from './ProductForm';
import { Product } from '@/app/types';
import { useProducts } from '@/app/context/products';

interface ProductModalProps {
  productId: string | number | null;
  onClose: () => void;
}

const ProductModal = ({ productId, onClose }: ProductModalProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { message } = App.useApp()
  const { products, setProducts } = useProducts()
  const editingProduct = products.find(product => product.id === productId)
  const isEdit = !!editingProduct
  const handleFinish = async (values: any) => {
    setConfirmLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!editingProduct) {
        const newProduct = { ...values, id: products.length + 1, isActive: true, createdAt: new Date().toISOString() }
        console.log(newProduct)
        setProducts([...products, newProduct])
      } else {
        setProducts(products => (products.map(product => {
          if (editingProduct.id === product.id) {
            return { ...product, ...values }
          } else {
            return product
          }
        })))
      }
      message.success(`Product ${isEdit ? 'updated' : 'added'} successfully`);
      onClose();
    } catch (error) {
      message.error("An error occurred");
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title={
        <span className="text-xl font-bold text-gray-800">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </span>
      }
      open={!!productId}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      centered
      width={550}
    >
      <ProductForm
        initialValues={editingProduct ?? undefined}
        onSave={handleFinish}
        onCancel={onClose}
        loading={confirmLoading}
      />
    </Modal>
  );
};

export default ProductModal;