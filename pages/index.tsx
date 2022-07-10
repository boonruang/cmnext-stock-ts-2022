import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { userSelector, resetUsername, signUp } from '@/store/slices/userSlice'
import { useAppDispatch } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {}

const Index = ({}: Props) => {
  const user = useSelector(userSelector)
  const dispatch = useAppDispatch()
  return <></>
}

export default withAuth(Index)
