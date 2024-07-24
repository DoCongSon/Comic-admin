import type { DataProvider, HttpError } from '@refinedev/core'
import { ITokens } from './auth-provider'

const API_URL = import.meta.env.VITE_API_URL

const fetcher = async (url: string, options?: RequestInit) => {
  const tokens: ITokens = JSON.parse(localStorage.getItem('my_tokens') || '{}')
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${tokens?.access?.token}`,
    },
  })
}

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    let url = `${API_URL}/${resource}/${id}`
    if (resource === 'chapters' && meta?.comicId) {
      url = `${API_URL}/comics/${meta.comicId}/${resource}/${id}`
    }
    const response = await fetcher(url)
    const data = await response.json()

    if (!response.ok) {
      const error: HttpError = {
        message: data.message,
        statusCode: data.code,
      }
      return Promise.reject(error)
    }

    return { data }
  },
  update: async ({ resource, id, variables, meta }) => {
    let url = `${API_URL}/${resource}/${id}`
    if (resource === 'chapters' && meta?.comicId) {
      url = `${API_URL}/comics/${meta.comicId}/${resource}/${id}`
    }
    const response = await fetcher(url, {
      method: 'PUT',
      body: JSON.stringify(variables),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    if (!response.ok) {
      const error: HttpError = {
        message: data.message,
        statusCode: data.code,
      }
      return Promise.reject(error)
    }

    return { data }
  },
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const params = new URLSearchParams()

    if (pagination && pagination.current && pagination.pageSize) {
      params.append('page', pagination.current.toString())
      params.append('limit', pagination.pageSize.toString())
    }

    if (sorters && sorters.length > 0) {
      params.append('sortBy', sorters.map((sorter) => `${sorter.field}:${sorter.order}`).join(','))
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ('field' in filter && filter.operator === 'eq') {
          // Our fake API supports "eq" operator by simply appending the field name and value to the query string.
          params.append(filter.field, filter.value)
        }
      })
    }
    let url = `${API_URL}/${resource}?${params.toString()}`
    if (resource === 'chapters' && meta?.comicId) {
      url = `${API_URL}/comics/${meta.comicId}/${resource}?${params.toString()}`
    }
    const response = await fetcher(url)
    const data = await response.json()

    if (!response.ok) {
      const error: HttpError = {
        message: data.message,
        statusCode: data.code,
      }
      return Promise.reject(error)
    }

    return {
      data: data.results,
      total: data.totalResults,
    }
  },
  create: async ({ resource, variables, meta }) => {
    let url = `${API_URL}/${resource}`
    if (resource === 'chapters' && meta?.comicId) {
      url = `${API_URL}/comics/${meta.comicId}/${resource}`
    }
    const response = await fetcher(url, {
      method: 'POST',
      body: JSON.stringify(variables),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    if (!response.ok) {
      const error: HttpError = {
        message: data.message,
        statusCode: data.code,
      }
      return Promise.reject(error)
    }

    return { data }
  },
  deleteOne: async ({ id, resource, meta }) => {
    let url = `${API_URL}/${resource}/${id}`
    if (resource === 'chapters' && meta?.comicId) {
      url = `${API_URL}/comics/${meta.comicId}/${resource}/${id}`
    }
    const response = await fetcher(url, {
      method: 'DELETE',
    })

    if (!response.ok) {
      const data = await response.json()
      const error: HttpError = {
        message: data.message,
        statusCode: data.code,
      }
      return Promise.reject(error)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = { id }

    return { data }
  },
  getApiUrl: () => API_URL,
  // Optional methods:
  // getMany: () => { /* ... */ },
  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  // custom: () => { /* ... */ },
}
