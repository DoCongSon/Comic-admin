import { BaseRecord } from '@refinedev/core'
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  EmailField,
  DeleteButton,
  ImageField,
  TagField,
} from '@refinedev/antd'
import { Table, Space, Input, Select } from 'antd'

export const UserList = () => {
  const { tableProps, sorters } = useTable({
    sorters: { initial: [{ field: 'name', order: 'asc' }] },
    filters: {
      initial: [],
    },
    syncWithLocation: true,
  })

  return (
    <List>
      <Table {...tableProps} rowKey='id'>
        <Table.Column dataIndex='id' title='ID' />
        <Table.Column
          dataIndex={['avatar']}
          title='Avatar'
          render={(value: string) => <ImageField style={{ borderRadius: 999 }} value={value} width={40} height={40} />}
        />
        <Table.Column
          dataIndex='name'
          title='Name'
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={['email']}
          title='Email'
          render={(value: string) => <EmailField value={value} />}
          sorter
          defaultSortOrder={getDefaultSortOrder('email', sorters)}
        />
        <Table.Column
          dataIndex={['verified']}
          title='Email verified'
          sorter
          render={(value: boolean) => (
            <TagField value={value ? 'VERIFIED' : 'UNVERIFIED'} color={value ? 'green' : 'red'} />
          )}
        />
        <Table.Column
          dataIndex='role'
          title='Role'
          render={(value: string) => (
            <TagField
              value={value === 'USERVIP' ? 'VIP USER' : value}
              color={value === 'ADMIN' ? 'orange' : value === 'USER' ? 'cyan' : 'purple'}
            />
          )}
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                placeholder='Select Role'
                options={[
                  { label: 'Admin', value: 'ADMIN' },
                  { label: 'User', value: 'USER' },
                  { label: 'VIP User', value: 'USERVIP' },
                ]}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          title='Actions'
          dataIndex='actions'
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size='middle' recordItemId={record.id} />
              <ShowButton hideText size='middle' recordItemId={record.id} />
              <DeleteButton hideText size='middle' recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}
