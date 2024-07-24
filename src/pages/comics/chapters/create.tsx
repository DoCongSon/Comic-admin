import { Create, useForm } from '@refinedev/antd'
import { Divider, Form, Input } from 'antd'

export const ChapterCreate = () => {
  const { formProps, saveButtonProps, onFinish } = useForm()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = (values: any) => {
    const chapter_images = Array.from({ length: values.end_page - values.start_page + 1 }, (_, index) => ({
      image_page: index,
      image_file: values.image_file_template.replace('{page}', String(index)),
    }))
    const data = {
      chapter_name: values.chapter_name,
      chapter_path: values.chapter_path,
      chapter_images,
    }
    console.log('🚀 ~ values data:', data)
    onFinish(data)
  }

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical' onFinish={handleFinish}>
        <Form.Item
          label='Chapter name'
          name={['chapter_name']}
          rules={[
            {
              required: true,
              type: 'number',
              transform(value) {
                return Number(value)
              },
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Chapter path'
          name={['chapter_path']}
          rules={[
            {
              required: true,
              type: 'url',
            },
          ]}>
          <Input />
        </Form.Item>
        <Divider>Chapter images</Divider>
        <Form.Item
          label='Image file template'
          name={['image_file_template']}
          rules={[
            {
              required: true,
              type: 'string',
              validator(_, value, callback) {
                if (!value.includes('{page}')) {
                  callback('Template must include {page}')
                }
                callback()
              },
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Start page'
          name={['start_page']}
          rules={[
            {
              required: true,
              type: 'number',
              transform(value) {
                return Number(value)
              },
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='End page'
          name={['end_page']}
          rules={[
            {
              required: true,
              type: 'number',
              transform(value) {
                return Number(value)
              },
            },
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  )
}
