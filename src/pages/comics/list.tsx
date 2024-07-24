import { BaseRecord, useMany } from '@refinedev/core'
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  BooleanField,
  TagField,
  ImageField,
} from '@refinedev/antd'
import { Table, Space } from 'antd'

export const ComicList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  })

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: 'categories',
    ids: [].concat(...(tableProps?.dataSource?.map((item) => item?.category) ?? [])),
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  })

  return (
    <List>
      <Table {...tableProps} rowKey='id'>
        <Table.Column dataIndex='id' title='Id' />
        <Table.Column dataIndex='name' title='Name' />
        <Table.Column dataIndex={['vip']} title='Vip' render={(value: boolean) => <BooleanField value={value} />} />
        <Table.Column dataIndex='status' title='Status' render={(value: string) => <TagField value={value} />} />
        <Table.Column
          dataIndex={['thumb_url']}
          title='Thumbnail'
          render={(value: string) => <ImageField style={{ maxWidth: '100px' }} value={value} />}
        />
        <Table.Column
          dataIndex='author'
          title='Author'
          render={(value: string[]) => (
            <>
              {value?.map((item) => (
                <TagField value={item} key={item} />
              ))}
            </>
          )}
        />
        <Table.Column
          dataIndex='category'
          title='Category'
          render={(value: string[]) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              <>
                {value?.map((item, index) => (
                  <TagField
                    key={index}
                    value={categoryData?.data?.find((resourceItems) => resourceItems.id === item)?.name}
                  />
                ))}
              </>
            )
          }
        />
        <Table.Column dataIndex='likes' title='Likes' />
        <Table.Column
          title='Actions'
          dataIndex='actions'
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size='small' recordItemId={record.id} />
              <ShowButton hideText size='small' recordItemId={record.id} />
              <DeleteButton hideText size='small' recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}
