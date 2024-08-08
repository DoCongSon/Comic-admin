import { Create, useForm, useSelect } from '@refinedev/antd'
import { Form, Input, Select } from 'antd'

export const PaymentCreate = () => {
  const { formProps, saveButtonProps } = useForm()

  const { selectProps: userSelectProps } = useSelect({
    resource: 'users',
    optionLabel: 'email',
  })

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <Form.Item
          label='User'
          name={'user'}
          rules={[
            {
              required: true,
            },
          ]}>
          <Select {...userSelectProps} />
        </Form.Item>
        <Form.Item
          label='Code'
          name={['code']}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Ruby'
          name={['ruby']}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  )
}
