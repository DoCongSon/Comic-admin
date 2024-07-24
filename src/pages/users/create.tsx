import { Create, useForm } from '@refinedev/antd'
import { Form, Input, Select } from 'antd'

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm()

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <Form.Item
          label='Email'
          name={['email']}
          rules={[
            {
              required: true,
              validator: (_, value, callback) => {
                if (!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
                  callback('Invalid email address')
                } else {
                  callback()
                }
              },
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Password'
          name={['password']}
          rules={[
            {
              required: true,
              validator(_, value, callback) {
                if (value.length < 8) {
                  callback('Password must be at least 8 characters')
                } else if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                  callback('Password must contain at least 1 letter and 1 number')
                } else {
                  callback()
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
              enum: ['ADMIN', 'USER', 'USERVIP'],
            },
          ]}>
          <Select
            placeholder='Select Role'
            options={[
              { label: 'Admin', value: 'ADMIN' },
              { label: 'User', value: 'USER' },
              { label: 'VIP User', value: 'USERVIP' },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  )
}
