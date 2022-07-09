import React from 'react'
import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'

type Props = {}

const Stock = ({}: Props) => {
  return (
    <Layout>
      <div>index stock</div>
    </Layout>
  )
}

export default withAuth(Stock)
