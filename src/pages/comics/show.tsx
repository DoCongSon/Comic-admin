import { useShow, useMany } from '@refinedev/core'
import {
  Show,
  TagField,
  TextField,
  BooleanField,
  MarkdownField,
  ImageField,
  NumberField,
  ListButton,
} from '@refinedev/antd'
import { Typography } from 'antd'

const { Title } = Typography

export const ComicShow = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: 'categories',
    ids: record?.category || [],
    queryOptions: {
      enabled: !!record && !!record?.category?.length,
    },
  })

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Chapters</Title>
      <ListButton resource='chapters' meta={{ comicId: record?.id }} />
      <Title level={5}>Id</Title>
      <TextField value={record?.id} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Origin Name</Title>
      {record?.origin_name?.map((item: string) => (
        <TagField value={item} key={item} />
      ))}
      <Title level={5}>Slug</Title>
      <TextField value={record?.slug} />
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>Status</Title>
      <TextField value={record?.status} />
      <Title level={5}>Vip</Title>
      <BooleanField value={record?.vip} />
      <Title level={5}>Thumbnail</Title>
      <ImageField style={{ maxWidth: 200 }} value={record?.thumb_url} />
      <Title level={5}>Author</Title>
      {record?.author?.map((item: string) => (
        <TagField value={item} key={item} />
      ))}
      <Title level={5}>Category</Title>
      {categoryIsLoading && record?.category?.length ? (
        <>Loading...</>
      ) : (
        <>
          {record?.category?.length ? (
            categoryData?.data?.map((category) => <TagField key={category?.name} value={category?.name} />)
          ) : (
            <></>
          )}
        </>
      )}
      <Title level={5}>Likes</Title>
      <NumberField value={record?.likes ?? ''} />
    </Show>
  )
}
