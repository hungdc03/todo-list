import { Form, Input, Button, Select, Typography } from 'antd';
import { STATUS, STATUS_OPTIONS } from '~/utils/const';
import { generateId } from '~/utils';
import StyledInput from '~/components/StyledInput';
import StyledTextarea from '~/components/StyledTextarea';
import StyledSelect from '~/components/StyledSelect';

const { Title } = Typography;

interface TodoFormProps {
  id: string;
  handleSubmit: (values: any) => void;
  initialValues?: any;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ id, handleSubmit, initialValues, onCancel }) => {
  const [form] = Form.useForm();
  const isCreating = id === 'create';

  const statusOptions = isCreating
    ? STATUS_OPTIONS.filter((status: Record<string, string>) => status.value !== STATUS.DONE)
    : STATUS_OPTIONS;

  const onSubmit = () => {
    form.validateFields().then((values) => {
      const data = {
        ...values,
        id: isCreating ? generateId() : id,
      };
      handleSubmit(data);
      if (isCreating) {
        form.resetFields();
      }
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      <Title className="!mb-3" level={3}>
        {isCreating ? 'Create Task' : 'Update Task'}
      </Title>
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
        <StyledInput placeholder="Title" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <StyledTextarea placeholder="Description" rows={4} />
      </Form.Item>
      <Form.Item name="status" label="Status">
        <StyledSelect options={statusOptions} />
      </Form.Item>
      <Form.Item className="flex justify-end">
        <button
          type="button"
          className="border border-gray-300 cursor-pointer text-black px-4 py-2 rounded-md mr-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="button" onClick={onSubmit} className="bg-black cursor-pointer text-white px-6 py-2 rounded-md">
          {isCreating ? 'Create' : 'Update'}
        </button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
