import { Form, Input, InputNumber, Select, Button, Space } from 'antd';
import { Product } from '@/app/types';
import { tags } from '@/constants/tags';
const MAX_COUNT = 3;

interface ProductFormProps {
  initialValues?: Product;
  onSave: (values: Partial<Product>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ProductForm = ({ initialValues, onSave, onCancel, loading }: ProductFormProps) => {
  const [form] = Form.useForm();
  const isEdit = !!initialValues;

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSave}
      requiredMark="optional"
      className="p-2"
    >
      <Form.Item
        name="name"
        label="Product Name"
        rules={[{ required: true, message: 'Please enter the product name' }]}
      >
        <Input placeholder="e.g. Sony WH-1000XM5" className="rounded-lg" />
      </Form.Item>

      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="price"
          label="Price (₹)"
          rules={[
            { required: true, message: 'Required' },
            { type: 'number', min: 1, message: 'Must be > 0' }
          ]}
        >
          <InputNumber className="w-full rounded-lg" placeholder="0.00" />
        </Form.Item>

        <Form.Item
          name="stock"
          label="Initial Stock"
          rules={[{ type: 'number', min: 0, message: 'Cannot be negative', required: true }]}
        >
          <InputNumber className="w-full rounded-lg" placeholder="0" />
        </Form.Item>
      </div>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please select a category' }]}
      >
        <Select placeholder="Select a category" className="rounded-lg">
          <Select.Option value="Electronics">Electronics</Select.Option>
          <Select.Option value="Furniture">Furniture</Select.Option>
          <Select.Option value="Kitchen">Kitchen</Select.Option>
          <Select.Option value="Sports">Sports</Select.Option>
          <Select.Option value="Fashion">Fashion</Select.Option>
          <Select.Option value="Home">Home</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="tags"
        label="Tags"
        rules={[{ required: true, message: 'Please select a tags' }]}
      >
        <Select
          mode="multiple"
          maxCount={MAX_COUNT}
          style={{ width: '100%' }}
          placeholder="Please select"
          options={tags.map(tag => ({label:tag, value:tag}))}
        />

      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} placeholder="Full product details..." className="rounded-lg" />
      </Form.Item>

      <div className="flex justify-end gap-3 mt-6">
        <Button onClick={onCancel} className="rounded-lg border-gray-200">
          Cancel
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="bg-violet-600 hover:bg-violet-700 rounded-lg px-8"
        >
          {isEdit ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </Form>
  );
};
export default ProductForm