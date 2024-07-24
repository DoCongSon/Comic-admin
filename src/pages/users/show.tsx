import { useShow } from '@refinedev/core'
import { Show, TagField, EmailField, TextField } from '@refinedev/antd'
import { Typography } from 'antd'

const { Title } = Typography

export const UserShow = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <TextField value={record?.id} />
      <Title level={5}>Email</Title>
      <EmailField value={record?.email} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Role</Title>
      <TagField value={record?.role} color={record?.role === 'ADMIN' ? 'orange' : 'cyan'} />
      <Title level={5}>Verified</Title>
      <TagField value={record?.verified ? 'VERIFIED' : 'UNVERIFIED'} color={record?.verified ? 'green' : 'red'} />
    </Show>
  )
}
