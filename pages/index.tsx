import Layout from '@/components/Layouts/Layout'
import { userSelector, resetUsername, signUp } from '@/store/slices/userSlice'
import { useAppDispatch } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const Index = ({}: Props) => {
  const user = useSelector(userSelector)
  const dispatch = useAppDispatch()
  return (
    <Layout>
      <div>index {user.username}</div>
      <button onClick={() => dispatch(resetUsername({ data: '555' }))}>
        Reset
      </button>

      <button
        onClick={() =>
          dispatch(signUp({ username: 'admin', password: '1234' }))
        }
      >
        Signup
      </button>
    </Layout>
  )
}

export default Index
