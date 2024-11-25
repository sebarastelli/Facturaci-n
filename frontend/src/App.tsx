import './App.css'
import ProductForm from './componentes/agregarProductos'
import ProductList from './componentes/listaDeProductos'
import AddClientForm from './componentes/agregarClientes'
import ClientList from './componentes/listaDeClientes'
import BillForm from './componentes/crearFactura'
import BillList from './componentes/listaDeFacturas'
import Home from './componentes/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-form" element={<ProductForm />} />
      <Route path="/product-list" element={<ProductList />} />
      <Route path="/add-client-list" element={<AddClientForm />} />
      <Route path="/bill-form" element={<BillForm />} />
      <Route path="/bill-list" element={<BillList />} />
      <Route path="/client-list" element={<ClientList />} />
      </Routes>
    </Router>  
    </>
  )
}

export default App
