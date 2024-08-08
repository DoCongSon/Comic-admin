import React from 'react'
import { Edit, useForm, useSelect } from '@refinedev/antd'
import { Form, Input, Select } from 'antd'

export const PaymentEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm()

  const paymentsData = queryResult?.data?.data

  const { selectProps: userSelectProps } = useSelect({
    resource: 'users',
    defaultValue: paymentsData?.user,
    optionLabel: 'email',
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
    </Edit>
  )
}
