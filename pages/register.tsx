import React from 'react'
import { makeStyles } from '@mui/material/styles'

import { Formik, Form, Field, FormikProps } from 'formik'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Router, { useRouter } from 'next/router'
import { TextField } from 'formik-material-ui'
import { Box } from '@mui/material'
import { useAppDispatch } from '@/store/store'
import { signUp } from '@/store/slices/userSlice'

interface Props {}

export default function Register({}: Props) {
  const dispatch = useAppDispatch()

  const showForm = ({
    values,
    setFieldValue,
    isValid,
    dirty,
    handleSubmit,
  }: FormikProps<any>) => {
    return (
      <Form onSubmit={handleSubmit}>
        <Field
          component={TextField}
          name="username"
          id="username"
          margin="normal"
          required
          fullWidth
          label="Username"
          autoComplete="email"
          autoFocus
        />
        <Field
          component={TextField}
          name="password"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Register
        </Button>
        <Button
          fullWidth
          size="small"
          color="primary"
          onClick={() => Router.push('/login')}
        >
          Cancel
        </Button>
      </Form>
    )
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 200 }}
            image="/static/img/next_register.jpg"
            title="Hello there!"
          />
          <CardContent>
            <Formik
              initialValues={{ username: '', password: '' }}
              onSubmit={async (values) => {
                const response = await dispatch(signUp(values))
                if (response.meta.requestStatus === 'rejected') {
                  alert('Register failed')
                } else {
                  Router.push('/login')
                }
              }}
            >
              {(props) => showForm(props)}
            </Formik>
          </CardContent>
        </Card>
        <style jsx global>
          {`
            body {
              min-height: 100vh;
              position: relative;
              margin: 0;
              background-size: cover;
              background-image: url('/static/img/bg4.jpg');
              text-align: center;
            }
          `}
        </style>
      </Box>
    </React.Fragment>
  )
}
