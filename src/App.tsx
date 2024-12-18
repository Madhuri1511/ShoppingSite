
import './App.css';
import { MainFile } from './Component/MainFile';
// import "../../shopping/node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import { ProductInfo } from './WebContrieve/Product';
import { NavBoot } from './Component/NavBoot';

function App() {
  return (
   <>
   <NavBoot/>
   <ProductInfo/>
   <MainFile/>
   </>
  );
}

export default App;
