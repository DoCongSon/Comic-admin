import { BaseRecord, useCustomMutation, useInvalidate, useMany } from '@refinedev/core'
import { useTable, List, EditButton, ShowButton, DeleteButton } from '@refinedev/antd'
import { Table, Space, Button, notification } from 'antd'
import { DollarCircleOutlined } from '@ant-design/icons'

export const PaymentList = () => {
  const { mutateAsync: customMutate } = useCustomMutation()
  const invalidate = useInvalidate()
  const { tableProps } = useTable({
    syncWithLocation: true,
  })

  const { data: userData, isLoading: userIsLoading } = useMany({
    resource: 'users',
    ids: tableProps?.dataSource?.map((item) => item?.user) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  })

  const handlePayment = async (record: BaseRecord) => {
    try {
      // Gọi API xử lý payment
      await customMutate({
        url: `/payments/${record.id}/handle`,
        method: 'post',
        values: {},
      })

      // Làm mới danh sách payment
      invalidate({
        resource: 'payments',
        invalidates: ['list'],
      })

      notification.success({
        message: 'Payment processed successfully',
      })
    } catch (error) {
      notification.error({
        message: 'Error processing payment',
      })
    }
  }

  return (
    <List>
      <Table {...tableProps} rowKey='id'>
        <Table.Column dataIndex='id' title='Id' />
        <Table.Column
          dataIndex={['user']}
          title='Username'
          render={(value) =>
            userIsLoading ? <>Loading...</> : userData?.data?.find((item) => item.id === value)?.name
          }
        />
        <Table.Column
          dataIndex={['user']}
          title='Email'
          render={(value) =>
            userIsLoading ? <>Loading...</> : userData?.data?.find((item) => item.id === value)?.email
          }
        />
        <Table.Column dataIndex='code' title='Code' />
        <Table.Column dataIndex='ruby' title='Ruby' />
        <Table.Column
          title='Actions'
          dataIndex='actions'
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size='small' recordItemId={record.id} />
              <ShowButton hideText size='small' recordItemId={record.id} />
              <DeleteButton hideText size='small' recordItemId={record.id} />
              <Button icon={<DollarCircleOutlined />} size='small' onClick={() => handlePayment(record)}></Button>
            </Space>
          )}
        />
      </Table>
    </List>
  )
}
