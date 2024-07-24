import { Edit, useForm } from '@refinedev/antd';
import { Form, Input, Select } from 'antd';

export const UserEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <Form.Item
          label='Email'
          name={['email']}
          rules={[
            {
              required: true,
              validator: (_, value, callback) => {
                if (!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
                  callback('Invalid email address');
                } else {
                  callback();
                }
              },
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Name'
          name={['name']}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Role'
          name={['role']}
          rules={[
            {
              required: true,
              enum: ['ADMIN', 'USER'],
            },
          ]}>
          <Select
            placeholder='Select Role'
            options={[
              { label: 'Admin', value: 'ADMIN' },
              { label: 'User', value: 'USER' },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
