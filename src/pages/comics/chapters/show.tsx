import { useShow } from '@refinedev/core'
import { Show, ImageField } from '@refinedev/antd'
import { Flex } from 'antd'
export const ChapterShow = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  return (
    <Show isLoading={isLoading}>
      <Flex vertical align='center'>
        {record?.chapter_images.map((item: { image_page: number; image_file: string }) => {
          return (
            <ImageField
              width={400}
              loading='lazy'
              key={item.image_page}
              value={`${record?.chapter_path}/${item.image_file}`}
            />
          )
        })}
      </Flex>
    </Show>
  )
}
