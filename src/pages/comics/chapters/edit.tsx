import { Edit, useForm } from '@refinedev/antd'
import { Form, Input, Divider } from 'antd'
import { generateTemplate } from '../../../utils'

export const ChapterEdit = () => {
  const { formProps, saveButtonProps, queryResult, form, onFinish } = useForm()
  const chaptersData = queryResult?.data?.data

  form.setFieldsValue({
    image_file_template: generateTemplate(
      chaptersData?.chapter_images.map((item: { image_file: string }) => item.image_file)
    ),
    start_page: chaptersData?.chapter_images[0].image_page,
    end_page: chaptersData?.chapter_images[chaptersData?.chapter_images.length - 1].image_page,
  })

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
    <Edit saveButtonProps={saveButtonProps}>
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
    </Edit>
  )
}
