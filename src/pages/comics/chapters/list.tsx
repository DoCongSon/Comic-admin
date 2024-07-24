import { DeleteButton, EditButton, List, ShowButton, useTable, UrlField } from '@refinedev/antd'
import { BaseRecord, useOne, useParsed } from '@refinedev/core'
import { Space, Table } from 'antd'

export const ChapterList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  })
  const { params } = useParsed()

  const { data: comicData, isLoading: comicIsLoading } = useOne({
    resource: 'comics',
    id: params?.comicId,
  })

  return (
    <List title={`Chapters of ${comicIsLoading ? 'loading...' : comicData?.data.name}`}>
      <Table {...tableProps} rowKey='id'>
        <Table.Column dataIndex='id' title='Id' />
        <Table.Column dataIndex='chapter_name' title='Chapter' />
        <Table.Column
          dataIndex='chapter_path'
          title='Chapter path'
          render={(value: string) => <UrlField value={value} />}
        />
        <Table.Column dataIndex='chapter_images' title='Images total' render={(value: object[]) => value.length} />
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
