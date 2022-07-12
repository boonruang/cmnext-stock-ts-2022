import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { ProductData } from '@/models/product.model'
import { doGetStockById, editProduct } from '@/services/serverService'
import { productSelector } from '@/store/slices/productSlice'
import { useAppDispatch } from '@/store/store'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { Field, Form, Formik, FormikProps } from 'formik'
import { TextField } from 'formik-material-ui'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { productImageURL } from '@/utils/commonUtil'
import Link from 'next/link'

type Props = {
  product?: ProductData
}

const Edit = ({ product }: Props) => {
  const showForm = ({ values, setFieldValue }: FormikProps<ProductData>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              Edit Stock
            </Typography>

            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="name"
              type="text"
              label="name"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="price"
              type="number"
              label="Price"
            />
            <br />
            <Field
              style={{ marginTop: 16 }}
              fullWidth
              component={TextField}
              name="stock"
              type="number"
              label="Stock"
            />
            <div style={{ margin: 16 }}>{showProviewImage(values)}</div>

            <div>
              <Image
                objectFit="cover"
                alt="product image"
                src="/static/img/ic_photo.png"
                width={25}
                height={20}
              />

              <span style={{ color: '#00B0CD', marginLeft: 10 }}>
                Add Picture
              </span>
              <input
                type="file"
                onChange={(e: React.ChangeEvent<any>) => {
                  e.preventDefault()
                  setFieldValue('file', e.target.files[0]) // for upload
                  setFieldValue(
                    'file_obj',
                    URL.createObjectURL(e.target.files[0]),
                  ) // for preview image
                }}
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: '20px 0 0 20px' }}
              />
            </div>
          </CardContent>

          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              Edit
            </Button>
            <Link href="/stock" passHref>
              <Button variant="outlined" fullWidth>
                Cancl
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Form>
    )
  }

  const showProviewImage = (values: any) => {
    if (values.file_obj) {
      return (
        <Image
          objectFit="contain"
          alt="product image"
          src={values.file_obj}
          width={100}
          height={100}
        />
      )
    } else if (values.image) {
      return (
        <Image
          objectFit="contain"
          alt="product image"
          src={productImageURL(values.image)}
          width={100}
          height={100}
        />
      )
    }
  }

  return (
    <Layout>
      <Formik
        initialValues={product!}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        {(props) => showForm(props)}
      </Formik>
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
