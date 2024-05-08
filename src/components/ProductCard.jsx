import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/ProductCard.css";

function ProductCard({ productoID, productName, sinStock, productType, precio, precio_anterior, rutaimg }) {
    const navigate = useNavigate();

    // Agregar a la cesta
    const handleProductClicked = (e) => {
        e.stopPropagation();
        navigate("/producto/" + productoID);
    }

    return (
        <div className="product-item" onClick={handleProductClicked}>
            <div className="product-item_img position-relative">
                {sinStock && <div className="out-of-stock position-absolute">Sin Stock</div>}
                {precio_anterior > 0 && <div className="sale">REBAJADO!</div>}
                <a href="#" className="action text-muted"><i className="bi bi-heart"></i></a>
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
            </div>
        </div>
    );
}

export default ProductCard;