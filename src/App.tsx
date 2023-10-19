
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Product from "./product/Product";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Product/>}/>
      </Routes>
    </>
  );
}

export default App;
