import React, { useContext } from 'react';
import { AppContext } from './AppContext';

function CarritoProductos() {
    const { carritoItems, setCarritoItems } = useContext(AppContext);

    const calculateTotalPrice = () => {
        if (carritoItems) {
            let total = 0;
            carritoItems.forEach((item) => {
                total += parseFloat(item.precio) * item.cantidad;
            });
            return total.toFixed(2);
        }
        return null;
    };

    const eliminarProducto = (index) => {
        const updatedItems = [...carritoItems];
        updatedItems.splice(index, 1);
        setCarritoItems(updatedItems);
    };

    const vaciarCarrito = () => {
        setCarritoItems([]);
    };

    const cambiarCantidad = (index, newQuantity) => {
        const updatedItems = [...carritoItems];
        updatedItems[index].cantidad = newQuantity;
        setCarritoItems(updatedItems.filter((item) => item.cantidad > 0));
    };

    return (
        <div className="container">
            {carritoItems?.map((item, index) => (
                <div key={index} className="row">
                    <div className='col-6 col-xl-3'>
                        <img src={item.rutaimg} />
                    </div>
                    <div className='col-6 col-xl-4 col-lg-6 col-md-5 col-sm-'>
                        <h3>{item.productName}</h3>
                        <p className='text-capitalize text-secondary'>{item.productType}</p>
                        <p className='text-secondary'>Talla {item.talla}</p>
                    </div>
                    <div className='col-6 col-xl-2 col-md-3 col-md-3 d-flex align-items-center justify-content-center'>
                        <div className="d-flex">
                            <button className='btn btn-secondary' onClick={() => cambiarCantidad(index, item.cantidad - 1)}>-</button>
                            <input className='form-control text-center' disabled type="text" value={item.cantidad} onChange={(e) => cambiarCantidad(index, parseInt(e.target.value))} />
                            <button className='btn btn-primary' onClick={() => cambiarCantidad(index, item.cantidad + 1)}>+</button>
                        </div>
                    </div>
                    <div className='col-3 col-xl-2 col-lg-3 col-md-1  d-flex align-items-center'>
                        <p>{(parseFloat(item.precio) * item.cantidad).toFixed(2)} €</p>
                    </div>
                    <div className='col-3 col-xl-1 d-flex align-items-center'>
                        <button className='btn btn-danger'>
                            <i className='bi bi-trash3-fill' onClick={() => eliminarProducto(index)}></i>
                        </button>
                    </div>
                    <hr className="product-divider" />
                </div>
            ))}
            <button className='btn btn-secondary' onClick={vaciarCarrito}>Vaciar Carrito</button>
            <div style={{ paddingTop: "30px" }}>
                <h2>Total: {carritoItems && calculateTotalPrice()}€</h2>
            </div>
        </div>
    );
};

export default CarritoProductos;
