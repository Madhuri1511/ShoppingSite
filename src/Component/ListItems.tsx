import React from 'react'
import {
  GridRowModes,
  DataGrid,

} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, GetItems } from '../redux/Store/actions/actions';
import { useNavigate } from 'react-router-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
export const ListItems = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (id: any) => {
    alert(id)
    navigate(`/edit/${id}`);
  };
  const columns: any = [
    { field: 'id' },
    { field: 'ProductName', width: 125, minWidth: 150, maxWidth: 200 },
    { field: 'Category', resizable: false },
    { field: 'Price', resizable: false },
    { field: 'PDate', resizable: false },
    { field: 'Quantity', resizable: false },
    {
      field: 'Product Image', resizable: false,
      width: 300,
      renderCell: (params: any) => {
        console.log("params", params.row.ProductImage)
        return (
          params.row.ProductImage.map((item: any) =>
            <img src={item} alt="" width={60} height={60} />
          )
        )

      }
    },
    {
      field: 'Actions', resizable: false,
      width: 300,
      renderCell: (params: any) => {
        return (
          <div style={{ display: "flex" }}>
            <div style={{ margin: 3 }} onClick={() => {

              handleEdit(params.row.id)
            }}>
              <img src={require('../Images/edit.png')} alt="" width={30} height={30} />
            </div>
            <div style={{ margin: 3 }} onClick={() => {

              dispatch(deleteItem(params.row.id))
              setAllData(items)
            }}>
              <img src={require('../Images/delete.png')} alt="" width={30} height={30} />
            </div>
          </div>
        )
      }
    },
  ]

  const items = useSelector((state: any) => state.items);
  const [allData, setAllData] = React.useState()
  const [cardData, setCardData] = React.useState([])
  const getData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products")
      const res = await response.json()
      console.log("response", res)
      setCardData(res)

    } catch (error) {
      console.log(error)
    }
  }



  React.useEffect(() => {
    getData()
    setAllData(items)
  }, [items])
  return (
    <>
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={allData}
          columns={columns}
        // editMode="row"
        // rowModesModel={rowModesModel}
        // onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
        // processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar,
        // }}
        // slotProps={{
        //   toolbar: { setRows, setRowModesModel },
        // }}
        />
      </Box>
      {/* <div className="card">
        <div className="row">
          {

            cardData.length > 0 && cardData.map((i: any) => {
              return (
                <div className="col-lg-4">
                  <img src={i.image} width={100} height={100}></img>
                  Name:{i.title}
                  Category:{i.category}
                </div>

              )
            })
          }
        </div>
      </div> */}

      <div className="container mt-4">
        <div className="row">
          {cardData.length > 0 && cardData.map((item:any) => (
            <div className="col-lg-4" key={item.id}>
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.title} style={{ height: '150px' }} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Category: {item.category}</p>
                  <p className="card-text">Price: ${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </>
      )
}
