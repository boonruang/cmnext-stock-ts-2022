import React from 'react'
import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import { getProducts, productSelector } from '@/store/slices/productSlice'
import { useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'
import { productImageURL } from '@/utils/commonUtil'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { IconButton, Stack, Typography } from '@mui/material'
import NumberFormat from 'react-number-format'
import Moment from 'react-moment'
import Router, { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { ProductData } from '@/models/product.model'

type Props = {}

const Stock = ({}: Props) => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const productList = useSelector(productSelector)
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [
    selectedProduct,
    setSelectedProduct,
  ] = React.useState<ProductData | null>(null)

  React.useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const columns: GridColDef[] = [
    { headerName: 'ID', field: 'id', width: 50 },
    {
      headerName: 'IMG',
      field: 'image',
      width: 80,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Zoom>
          <Image
            height={500}
            width={500}
            objectFit="cover"
            alt="product image"
            src={productImageURL(value)}
            style={{ width: 70, height: 70, borderRadius: '5%' }}
          />
        </Zoom>
      ),
    },

    {
      headerName: 'Name',
      field: 'name',
      width: 350,
    },
    {
      headerName: 'Stock',
      field: 'stock',
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumberFormat
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
          />
        </Typography>
      ),
    },
    {
      headerName: 'Price',
      field: 'price',
      width: 120,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <NumberFormat
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={'฿'}
          />
        </Typography>
      ),
    },
    {
      headerName: 'TIME',
      field: 'createdAt',
      width: 220,
      renderCell: ({ value }: GridRenderCellParams<string>) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    },
    {
      headerName: 'ACTION',
      field: '.',
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<string>) => (
        <Stack direction="row">
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => router.push('/stock/edit?id=' + row.id)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              setSelectedProduct(row)
              setOpenDialog(true)
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ]

  return (
    <Layout>
      <div>index stock</div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={productList ?? []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Layout>
  )
}

export default withAuth(Stock)
