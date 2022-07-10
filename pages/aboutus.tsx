import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import React from 'react'

type Props = {}

const AboutUs = ({}: Props) => {
  return (
    <Layout>
      <div>about us</div>
    </Layout>
  )
}

export default withAuth(AboutUs)
