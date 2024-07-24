import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useGetIdentity } from '@refinedev/core';
import { Flex, Button, Typography, Avatar, Space } from 'antd';
import { FC } from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Header: FC<HeaderProps> = (props) => {
  const { data: identity } = useGetIdentity<{ name: string; avatar: string }>();

  return (
    <Flex
      align='center'
      justify='flex-end'
      gap='2rem'
      style={{
        padding: '1rem',
      }}>
      <Button
        onClick={() => {
          props.setTheme(props.theme === 'light' ? 'dark' : 'light');
        }}
        icon={props.theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
      />
      <Space size='middle'>
        <Typography.Title level={5} style={{ margin: 0 }}>
          {identity?.name}
        </Typography.Title>
        <Avatar size='large' src={identity?.avatar} />
      </Space>
    </Flex>
  );
};

export default Header;
