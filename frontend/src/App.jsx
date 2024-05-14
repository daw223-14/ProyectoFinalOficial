import {Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './paginas/Home';
import LoginAdmin from './components/LoginAdmin';
import AdminComponent from './paginas/Admin';
import Cabecera from './components/Cabecera';
import Productos from './paginas/Productos';
import Niños from './paginas/Niños';
import Hombre from './paginas/Hombre';
import Mujer from './paginas/Mujer';
import Footer from './components/Footer';
import Login from './components/LoginUser';
import Registro from './components/RegistroUser';
import Carrito from './paginas/Carrito';
import useAuthVerification from './components/useAuthVerification'; 
import ListaDeseos from './components/ListaDeseos';

function App() {
  const location = useLocation();
  useAuthVerification();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Cabecera />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/producto/:productoID" element={<Productos />} />
        <Route path="/hombre" element={<Hombre />} />
        <Route path="/mujer" element={<Mujer />} />
        <Route path="/ninos" element={<Niños />} />
        <Route path="/admin" element={<AdminComponent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path='/listaDeseos' element={<ListaDeseos />}/>
      </Routes>
      <br />
      <Footer />
    </>
  )
}

export default App
