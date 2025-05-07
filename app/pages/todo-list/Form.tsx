import { Form, Input, Button, Select } from 'antd';
import { STATUS, STATUS_OPTIONS } from '~/utils/const';

const TodoForm = ({ id, handleSubmit }: any) => {
  const [form] = Form.useForm();

  const statusForCreate = STATUS_OPTIONS.filter((status: Record<string, string>) => status.value !== STATUS.DONE);

  const handleOnFinish = (values: any) => {
    handleSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleOnFinish} layout="vertical">
      <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Tiêu đề là bắt buộc' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input.TextArea placeholder="Mô tả" />
      </Form.Item>
      <Form.Item name="status" label="Trạng thái" initialValue={STATUS.TODO}>
        <Select options={statusForCreate} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tạo mới
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TodoForm;
