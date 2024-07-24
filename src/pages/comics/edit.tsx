import { Edit, useForm, useSelect } from '@refinedev/antd'
import { Form, Input, Checkbox, Image, Select, Space } from 'antd'

export const ComicEdit = () => {
  const { formProps, saveButtonProps, queryResult, onFinish, form } = useForm()
  const comicsData = queryResult?.data?.data
  const thumb_url_value = Form.useWatch('thumb_url', form)

  const { selectProps: categorySelectProps } = useSelect({
    resource: 'categories',
    defaultValue: comicsData?.category,
    optionLabel: 'name',
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = (values: any) => {
    if (!Array.isArray(values.author)) {
      values.author = values.author.split(',').map((item: string) => item.trim())
    }
    if (!Array.isArray(values.origin_name)) {
      values.origin_name = values.origin_name.split(',').map((item: string) => item.trim())
    }
    onFinish(values)
  }

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical' onFinish={handleFinish}>
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
          label='Origin Name'
          name={['origin_name']}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Slug'
          name={['slug']}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Content'
          name='content'
          rules={[
            {
              required: true,
            },
          ]}>
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          label='Status'
          name={['status']}
          rules={[
            {
              required: true,
              enum: ['coming_soon', 'completed', 'ongoing'],
            },
          ]}>
          <Select
            placeholder='Select status'
            options={[
              { label: 'Coming soon', value: 'coming_soon' },
              { label: 'Completed', value: 'completed' },
              { label: 'Ongoing', value: 'ongoing' },
            ]}
          />
        </Form.Item>
        <Form.Item
          label='Vip'
          valuePropName='checked'
          name={['vip']}
          rules={[
            {
              required: true,
            },
          ]}>
          <Checkbox>Vip</Checkbox>
        </Form.Item>
        <Form.Item
          label='Thumb Url'
          name='thumb_url'
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Space style={{ width: '100%', marginBottom: 24 }} align='center' direction='vertical'>
          <Image width={200} src={thumb_url_value} />
        </Space>
        <Form.Item
          label='Author'
          name={['author']}
          rules={[
            {
              required: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Category'
          name={'category'}
          rules={[
            {
              required: true,
            },
          ]}>
          <Select mode='multiple' {...categorySelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  )
}
