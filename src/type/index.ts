export interface PaginationProps {
  pageSize: number;
  setCurrentPage: (value: number) => void;
  currentPage: number;
  totalJobs?: number;
}

export interface KeyObjectValue<T> {
  [key: string]: T
}

export interface Category {
  _id: string,
  name: string
}

export interface BookType {
  name: string
  author: string
  publisher: string
  publishingYear: string
  category: string
  summary?: string
  quantity: number
  language?: string
}

export interface BookType {
  name: string
  author: string
  publisher: string
  publishingYear: string
  category: string
  summary?: string
  quantity: number
  language?: string
}

export interface UserType {
  name: string
  email: string
  phoneNumber: string
  address: string
  borrowedBook?: string[]
  role: string
}