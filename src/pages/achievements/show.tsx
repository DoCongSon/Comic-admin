import { useShow } from '@refinedev/core'
import { Show, TextField } from '@refinedev/antd'
import { Typography } from 'antd'

const { Title } = Typography

export const AchievementShow = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <TextField value={record?.id} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Description</Title>
      <TextField value={record?.description} />
    </Show>
  )
}
