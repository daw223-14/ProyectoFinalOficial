import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import "../styles/ProductCard.css";

function ProductCard({ productoID, productName, sinStock, productType, precio, precio_anterior, rutaimg }) {
    const navigate = useNavigate();
    const { listaDeseos, setListaDeseos } = useContext(AppContext);
    const [enListaDeseos, setEnListaDeseos] = useState(false);
    const [corazonRojo, setCorazonRojo] = useState(false);

    // Verificar si el producto está en la lista de deseos
    useState(() => {
        const isInWishlist = listaDeseos.some(producto => producto.productoID === productoID);
        setEnListaDeseos(isInWishlist);
    }, [listaDeseos, productoID]);

    // Agregar a la lista de deseos o eliminar de ella
    const handleAddToWishList = (e) => {
        e.stopPropagation();
        setCorazonRojo(!corazonRojo);
        if (enListaDeseos) {
            // Eliminar de la lista de deseos
            setListaDeseos(prevListaDeseos => prevListaDeseos.filter(producto => producto.productoID !== productoID));
        } else {
            // Agregar a la lista de deseos
            setListaDeseos(prevListaDeseos => [
                ...prevListaDeseos,
                {
                    productoID,
                    productName,
                    sinStock,
                    productType,
                    precio,
                    precio_anterior,
                    rutaimg
                }
            ]);
        }
        setEnListaDeseos(prevEnListaDeseos => !prevEnListaDeseos);
    };

    // Navegar al detalle del producto
    const handleProductClicked = (e) => {
        e.stopPropagation();
        navigate("/producto/" + productoID);
    };

    return (
        <div className="product-item" onClick={handleProductClicked}>
            <div className="product-item_img position-relative">
                {sinStock && <div className="out-of-stock position-absolute">Sin Stock</div>}
                {precio_anterior > 0 && <div className="sale">REBAJADO!</div>}
                <a className={`action text-muted ${corazonRojo ? 'text-danger' : ''}`} onClick={handleAddToWishList}>
                    <i className={`bi bi-heart${enListaDeseos ? '-fill' : ''}`}></i>
                </a>
                <p>
                    <img src={rutaimg} alt="" />
                </p>
            </div>
            <div className="product-item-little-desc">
                <div>
                    <p className="product-name fw-bold">
                        {productName}
                    </p>
                </div>
                {precio_anterior > 0 && (
                    <del className="product-item-little-desc_old-product-precio">
                        {precio_anterior}€
                    </del>
                )}
                <span className="product-item-little-desc_product-precio"> {precio}€</span>
                <div>
                    <p className="product-item-little-desc_categories-name text-capitalize text-secondary">
                        {productType}
                    </p>
                </div>
                {enListaDeseos && (
                    <span className="text-success">Agregado a lista de deseos</span>
                )}
            </div>
        </div>
    );
}

export default ProductCard;
