
import React from 'react'
import '../CSS/common.css'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, updateItem } from '../redux/Store/actions/actions'
import { ListItems } from './ListItems'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

export const AddNewItems = () => {
  const[componentName,setComponentName]=React.useState('')
  const [isImageEdit,setIsImageEdit]=React.useState(false)
  const [AddNewProduct, setAddNewProduct] = React.useState({
    id:0,
    ProductName: '',
    Category: "",
    Price: "",
    PDate: "",
    Quantity: "",
    ProductImage: []
  })
  const [ErrorMasage,setErrorMessages] = React.useState({
    id:0,
    ProductName: '',
    Category: "",
    Price: "",
    PDate: "",
    Quantity: "",
    ProductImage: []
  })
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const { id } :any= useParams(); 
  const itemToEdit = useSelector((state:any) =>
    state.items.find((item:any) => item.id === parseInt(id))
  );
  // const handleChange = (e: any) => {
  //   const { name, value, files } = e.target;
  //   setAddNewProduct({
  //     ...AddNewProduct,
  //     [name]: name === "ProductImage" ?  Array.from(files)  : value
  //   })
  // }
  const validation=()=>{
    let  formIsValid=true;
    let error:any={}
    if(!AddNewProduct.ProductName){
        formIsValid=false;
        error.ProductName="Product Name is required"
    }
    if(!AddNewProduct.Category){
      formIsValid=false;
      error.Category="Product Category is required"
  }
    setErrorMessages(error)
    return formIsValid
  
  }
  const handleChange = (e: any) => {
   
    const { name, value, files } = e.target;
   
    if (name === "ProductImage" && files) {
      const fileArray = Array.from(files);
      const base64Promises = fileArray.map((file:any) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            resolve(reader.result as string); // Convert to Base64
          };
          reader.onerror = error => {
            reject(error);
          };
        });
      });

      Promise.all(base64Promises).then(base64Images => {
        if(id){
          setAddNewProduct((prev) => {
            const updatedImages:any = [...prev.ProductImage];
           updatedImages.push(...base64Images) // Replace image at specified index
         
            return { ...prev, ProductImage: updatedImages };
          });
        }
        else{
          setAddNewProduct({
            ...AddNewProduct,
            [name]: base64Images // Set Base64 images
          });
        }
       
      });
    } else {
      setAddNewProduct({
        ...AddNewProduct,
        [name]: value // Update other inputs
      });
    }
  };

  React.useEffect(() => {
    if (id && itemToEdit) {
      setAddNewProduct(itemToEdit);
    }
  }, [id, itemToEdit]);
  const handleSubmit = () => {
    // Implement your submit functionality here
    // AddNewProduct.id=Date.now()
    // console.log(AddNewProduct);
    // dispatch(addItem(AddNewProduct))
    // navigate("/")
    // setComponentName("List")
    if(validation()){
      if (id) {
        dispatch(updateItem({ ...AddNewProduct, id: parseInt(id) })); // Update item if editing
      } else {
        dispatch(addItem({ ...AddNewProduct, id: Date.now() })); // Add new item if not editing
      }
      navigate("/");
    }
    else{
      alert('no validate')
    }
   
  };
  const handleReplaceImage = (index: number, newImage: string) => {
    setAddNewProduct((prev) => {
      const updatedImages:any = [...prev.ProductImage];
      updatedImages[index] = newImage; // Replace image at specified index
      return { ...prev, ProductImage: updatedImages };
    });
  };

  
  const handleCancel = () => {
    setAddNewProduct({
      id:0,
      ProductName: '',
      Category: '',
      Price: '',
      PDate: '',
      Quantity: '',
      ProductImage: []
    });
  };

  return (
    <>
    {
      componentName==="List"?
      <ListItems/>:
    
      <div className='MainContainer'>
        <div className="row rowCSS">
          <div className="col">
            <input type="text"
              name='ProductName'
              placeholder='Product Name..'
              value={AddNewProduct.ProductName}
              onChange={handleChange}
            />
            
          </div>
          {ErrorMasage.ProductName?<span style={{color:'red'}}>{ErrorMasage.ProductName}</span>:null}
        </div>
        <div className="row rowCSS">
          <div className="col">
            <select style={{ width: 190, height: 30 }}
              name='Category'
              value={AddNewProduct.Category}
              onChange={handleChange}>
              <option>Select Category</option>
              <option>Electronics</option>
              <option>Agriculture</option>
              <option>Grocery</option>
              <option>Others</option>
            </select>
          </div>
          {ErrorMasage.Category?<span style={{color:'red'}}>{ErrorMasage.Category}</span>:null}
        </div>
        <div className="row rowCSS">
          <div className="col">
            <input type="text"
              name='Price'
              placeholder='Product Price..'
              value={AddNewProduct.Price}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row rowCSS">
          <div className="col">
            <input type="date"
              name='PDate'
              placeholder="Product Date" 
              onChange={handleChange}
              value={AddNewProduct.PDate}
              />
          </div>
        </div>
        <div className="row rowCSS">
          <div className="col">
            <input type="text"
              name='Quantity'
              placeholder='Product Quantity..'
              value={AddNewProduct.Quantity}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* {id && AddNewProduct.ProductImage.length > 0 && (
        <div>
          <p>Existing Images:</p>
          {AddNewProduct.ProductImage.map((imgSrc, index) => (
             <div>
              <img src={imgSrc} alt="Product" style={{ width: 50, height: 50, margin: 5 }} />
              <FontAwesomeIcon icon={faEdit} onClick={()=>{
                alert(AddNewProduct.id)
                console.log("")
              }}/>
             </div>
            
            
          ))}
        </div>
      )} */}
      {id && AddNewProduct.ProductImage.length > 0 && (
            <div>
              <p>Existing Images:</p>
              {AddNewProduct.ProductImage.map((imgSrc, index) => (
                <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                  <img src={imgSrc} alt="Product" style={{ width: 50, height: 50, margin: 5 }} />
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.onchange = (e: any) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = () => handleReplaceImage(index, reader.result as string);
                        reader.readAsDataURL(file);
                      };
                      input.click();
                    }}
                  />
                </div>
              ))}
            </div>
          )}


        <div className="row rowCSS">
          <div className="col">
            <input type="file"
              name='ProductImage'
              placeholder='Product Image..'
              multiple
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row" style={{ padding: 10 }}>
          <button
            style={{ width: 100, height: 30, marginRight: 5, marginLeft: 5 }}
            onClick={handleSubmit}
          >Add Item</button>
          <button
            style={{ width: 100, height: 30 }}
            onClick={handleCancel}
          >
            Cancel</button>
        </div>
      </div>
      }
    </>
  )
}
