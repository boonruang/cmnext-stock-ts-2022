import { SignUp } from '@/models/auth.model'
import axios from 'axios'

type signProps = {
  username: string
  password: string
}

export const signUp = async (user: signProps): Promise<SignUp> => {
  const response = await axios.post(
    'http://localhost:8085/api/v2/authen/register',
    user,
  )
  return response.data
}
