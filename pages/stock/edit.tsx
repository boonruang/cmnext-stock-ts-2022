import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { ProductData } from '@/models/product.model'
import { doGetStockById } from '@/services/serverService'
import { productSelector } from '@/store/slices/productSlice'
import { useAppDispatch } from '@/store/store'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {
  product?: ProductData
}

const Edit = ({ product }: Props) => {
  const dispatch = useAppDispatch()
  const productReducer = useSelector(productSelector)

  return (
    <Layout>
      <div>Edit {JSON.stringify(product)}</div>
    </Layout>
  )
}
export default withAuth(Edit)

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id }: any = context.query
  if (id) {
    const product = await doGetStockById(id)
    return {
      props: {
        product,
      },
    }
  } else {
    return { props: {} }
  }
}
