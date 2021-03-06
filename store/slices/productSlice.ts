import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ProductData } from '@/models/product.model'
import { RootState, store } from '@/store/store'
import * as serverService from '@/services/serverService'
import httpClient from '@/utils/httpClient'
import { AxiosRequestConfig } from 'axios'
import Router from 'next/router'
import { config } from 'process'

interface ProductState {
  products: ProductData[]
}

const initialState: ProductState = {
  products: [],
}

export const getProducts = createAsyncThunk(
  'product/get',
  async (keyword?: string) => {
    return await serverService.getProducts(keyword)
  },
)

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (id: string) => {
    await serverService.deleteProduct(id)
    store.dispatch(getProducts())
  },
)

// export const editProduct = createAsyncThunk(
//   'product/edit',
//   async (data?: FormData) => {},
// )

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fullfiled, pending, rejected
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
  },
})

// export common product selector
export const productSelector = (store: RootState): ProductData[] | undefined =>
  store.product.products

// export reducer
export default productSlice.reducer
