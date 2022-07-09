import { GetSession, SignIn, SignUp } from '@/models/auth.model'
import httpClient from '@/utils/httpClient'

type signProps = {
  username: string
  password: string
}

export const signUp = async (user: signProps): Promise<SignUp> => {
  const response = await httpClient.post('/authen/register', user)
  return response.data
}

export const signIn = async (user: signProps): Promise<SignIn> => {
  const { data: response } = await httpClient.post(`/auth/signin`, user, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  })
  return response
}
export const signOut = async () => {
  const response = await httpClient.get('/auth/signout', {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  })
  return response.data
}
export const getSession = async (): Promise<GetSession> => {
  const response = await httpClient.get(`/auth/session`, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  })
  return response.data
}
