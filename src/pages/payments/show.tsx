import React from 'react'
import { useShow, useOne } from '@refinedev/core'
import { Show, TextField, NumberField } from '@refinedev/antd'
import { Typography } from 'antd'

const { Title } = Typography

export const PaymentShow = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  const { data: userData, isLoading: userIsLoading } = useOne({
    resource: 'users',
    id: record?.user || '',
    queryOptions: {
      enabled: !!record,
    },
  })

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <TextField value={record?.id} />
      <Title level={5}>Username</Title>
      {userIsLoading ? <>Loading...</> : <>{userData?.data?.name}</>}
      <Title level={5}>Email</Title>
      {userIsLoading ? <>Loading...</> : <>{userData?.data?.email}</>}
      <Title level={5}>Code</Title>
      <TextField value={record?.code} />
      <Title level={5}>Ruby</Title>
      <NumberField value={record?.ruby ?? ''} />
    </Show>
  )
}
