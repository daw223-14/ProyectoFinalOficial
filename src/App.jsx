import {Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './paginas/Home';
/*;
import ContactUs from './paginas/ContactUs';

;
import Checkout from './paginas/Checkout';
;
 */import LoginAdmin from './components/LoginAdmin';
import AdminComponent from './paginas/Admin';
import Cabecera from './components/Cabecera';
import Productos from './paginas/Productos';
import Niños from './paginas/Niños';
import Hombre from './paginas/Hombre';
import Mujer from './paginas/Mujer';
import Footer from './components/Footer';
import Login from './components/LoginUser';
import Registro from './components/RegistroUser';
import useAuthVerification from './components/useAuthVerification'; 

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
        
        {/* />
        <Route path="/contactus" element={<ContactUs />} />
          */}
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/producto/:productoID" element={<Productos />} />
        <Route path="/hombre" element={<Hombre />} />
        <Route path="/mujer" element={<Mujer />} />
        <Route path="/niños" element={<Niños />} />
        <Route path="/admin" element={<AdminComponent />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/checkout" element={<Checkout />} />
         */}
      </Routes>
      <br />
      <Footer />
    </>
  )
}

export default App
