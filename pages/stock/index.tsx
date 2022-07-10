import React from 'react'
import Layout from '@/components/Layouts/Layout'
import withAuth from '@/components/withAuth'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { getProducts, productSelector } from '@/store/slices/productSlice'
import { useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'

type Props = {}

const Stock = ({}: Props) => {
  const dispatch = useAppDispatch()
  const productList = useSelector(productSelector)

  React.useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 150,
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
