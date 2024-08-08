import { useState } from 'react'
import { Refine, Authenticated } from '@refinedev/core'
import routerProvider, { NavigateToResource } from '@refinedev/react-router-v6'
import { ErrorComponent, ThemedLayoutV2, ThemedTitleV2, useNotificationProvider } from '@refinedev/antd'
import { DashboardOutlined, UserOutlined, BookOutlined, PayCircleOutlined } from '@ant-design/icons'

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import { ConfigProvider, App as AntdApp, theme } from 'antd'

import { dataProvider } from './providers/data-provider'
import { authProvider } from './providers/auth-provider'

import { UserCreate, UserEdit, UserList, UserShow } from './pages/users'
import { AchievementCreate, AchievementEdit, AchievementList, AchievementShow } from './pages/achievements'
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from './pages/categories'
import { PaymentCreate, PaymentEdit, PaymentList, PaymentShow } from './pages/payments'
import { ComicCreate, ComicEdit, ComicList, ComicShow } from './pages/comics'
import { ChapterCreate, ChapterEdit, ChapterList, ChapterShow } from './pages/comics/chapters'

import { Dashboard } from './pages/dashboard'
import { Login } from './pages/login'
import Header from './components/Header'

import 'antd/dist/reset.css'
import RefreshToken from './components/refresh-token'

export default function App(): JSX.Element {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark')

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: currentTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        }}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: 'dashboard',
                list: '/',
                meta: {
                  label: 'Dashboard',
                  icon: <DashboardOutlined />,
                },
              },
              {
                name: 'users',
                list: '/users',
                create: '/users/create',
                edit: '/users/edit/:id',
                show: '/users/show/:id',
                meta: {
                  label: 'Users',
                  icon: <UserOutlined />,
                  canDelete: true,
                },
              },
              {
                name: 'achievements',
                list: '/achievements',
                create: '/achievements/create',
                edit: '/achievements/edit/:id',
                show: '/achievements/show/:id',
                meta: {
                  label: 'Achievements',
                  icon: <BookOutlined />,
                  canDelete: true,
                },
              },
              {
                name: 'categories',
                list: '/categories',
                create: '/categories/create',
                edit: '/categories/edit/:id',
                show: '/categories/show/:id',
                meta: {
                  label: 'Categories',
                  icon: <BookOutlined />,
                  canDelete: true,
                },
              },
              {
                name: 'comics',
                list: '/comics',
                create: '/comics/create',
                edit: '/comics/edit/:id',
                show: '/comics/show/:id',
                meta: {
                  label: 'Comics',
                  icon: <BookOutlined />,
                  canDelete: true,
                },
              },
              {
                name: 'chapters',
                list: '/comics/:comicId/chapters',
                create: '/comics/:comicId/chapters/create',
                edit: '/comics/:comicId/chapters/edit/:id',
                show: '/comics/:comicId/chapters/show/:id',
                meta: {
                  label: 'Chapters',
                  canDelete: true,
                },
              },
              {
                name: 'payments',
                list: '/payments',
                create: '/payments/create',
                edit: '/payments/edit/:id',
                show: '/payments/show/:id',
                meta: {
                  label: 'Payments',
                  icon: <PayCircleOutlined />,
                  canDelete: true,
                },
              },
            ]}
            options={{
              projectId: 'tsxyLz-Ik4ttn-7d7eRE',
            }}>
            <Routes>
              <Route
                element={
                  <Authenticated key='authenticated-routes' redirectOnFail='/login'>
                    <ThemedLayoutV2
                      dashboard
                      Header={() => <Header theme={currentTheme} setTheme={setCurrentTheme} />}
                      Title={(props) => <ThemedTitleV2 {...props} text='Comic Admin' />}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }>
                <Route index element={<Dashboard />} />
                <Route path='/users'>
                  <Route index element={<UserList />} />
                  <Route path='show/:id' element={<UserShow />} />
                  <Route path='edit/:id' element={<UserEdit />} />
                  <Route path='create' element={<UserCreate />} />
                </Route>
                <Route path='/comics'>
                  <Route index element={<ComicList />} />
                  <Route path='show/:id' element={<ComicShow />} />
                  <Route path='edit/:id' element={<ComicEdit />} />
                  <Route path='create' element={<ComicCreate />} />
                  <Route path=':comicId/chapters'>
                    <Route index element={<ChapterList />} />
                    <Route path='show/:id' element={<ChapterShow />} />
                    <Route path='edit/:id' element={<ChapterEdit />} />
                    <Route path='create' element={<ChapterCreate />} />
                  </Route>
                </Route>
                <Route path='/achievements'>
                  <Route index element={<AchievementList />} />
                  <Route path='show/:id' element={<AchievementShow />} />
                  <Route path='edit/:id' element={<AchievementEdit />} />
                  <Route path='create' element={<AchievementCreate />} />
                </Route>
                <Route path='/categories'>
                  <Route index element={<CategoryList />} />
                  <Route path='show/:id' element={<CategoryShow />} />
                  <Route path='edit/:id' element={<CategoryEdit />} />
                  <Route path='create' element={<CategoryCreate />} />
                </Route>
                <Route path='/payments'>
                  <Route index element={<PaymentList />} />
                  <Route path='show/:id' element={<PaymentShow />} />
                  <Route path='edit/:id' element={<PaymentEdit />} />
                  <Route path='create' element={<PaymentCreate />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key='auth-pages' fallback={<Outlet />}>
                    <NavigateToResource resource='users' />
                  </Authenticated>
                }>
                <Route path='/login' element={<Login />} />
              </Route>
              <Route path='*' element={<ErrorComponent />} />
            </Routes>
            <RefreshToken />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  )
}
