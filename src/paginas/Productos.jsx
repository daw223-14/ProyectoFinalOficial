import React, { useEffect, useState, useContext } from "react";
import axios from "./../components/axios";
import { useParams } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import { AppContext } from "../components/AppContext";
import "./../styles/ProductPage.css";

function Productos() {
    const { productoID } = useParams();
    const [producto, setProducto] = useState([])
    const [imagen, setImagen] = useState([]);
    const [selectedTalla, setSelectedTalla] = useState("");
    const { carritoItems, setCarritoItems } = useContext(AppContext);

    const fetchData = async () => {
        try {
            const response = await axios.get("/api.php", {
                params: {
                    productoID: productoID,
                    limit: 1
                }
            });
            setProducto(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const productoEnCarrito = carritoItems.find((item) => item.productoID === productoID && item.talla === selectedTalla);

        if (productoEnCarrito) {
            const productoIndex = carritoItems.findIndex((item) => item.productoID === productoID && item.talla === selectedTalla);
            const updatedItems = [...carritoItems];
            updatedItems[productoIndex] = {
                ...updatedItems[productoIndex],
                cantidad: updatedItems[productoIndex].cantidad + 1
            };
            setCarritoItems(updatedItems);
        } else {
            const { nombre, genero, precio, precio_anterior, rutaimg } = producto;
            const productName = nombre;
            const productType = genero;
            setCarritoItems((prevCartItems) => [
                ...prevCartItems,
                {
                    productoID,
                    productName,
                    productType,
                    precio,
                    precio_anterior,
                    talla: selectedTalla,
                    rutaimg,
                    cantidad: 1
                }
            ]);
        }
    };

    useEffect(() => {
        if (producto.productoID) {
            const productImages = Array.from({ length: 2 }, (_, index) => {
                return (index === 0 ?
                    `../src/assets/img0${producto.productoID}.jpg` :
                    `../src/assets/img0${producto.productoID}-2.jpg`)
            });
            setImagen(productImages);
        }
    }, [producto]);

    const handleTallaChange = (e) => {
        setSelectedTalla(e.target.value);
    };

    return (
        <main className="full-block">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img src={`/` + producto.rutaimg} alt="" />
                    </div>
                    <div className="col-md-6">
                        <div>
                            <div className="small mb-1 text-capitalize">{producto.genero}</div>
                            <div className="display-5 fw-bolder">
                                {producto.nombre}
                            </div>
                            <p>{producto.descripcion}</p>
                            <div className="text-end">
                                {producto.precio_anterior ? <span className="text-decoration-line-through text-danger">{producto.precio_anterior}€</span> : null}
                                <span className="fw-bolder">{producto.precio}€</span>
                            </div>
                            <div className="row">
                                <div className="col-5 col-xl-5 pb-5">
                                    <label className="form-label" htmlFor="">Selecciona tu talla</label>
                                    <select className="form-select" id="tallaSelect" value={selectedTalla} onChange={handleTallaChange}>
                                        <option value="">Seleccionar</option>
                                        {producto.tallas && producto.tallas.map((talla) => (
                                            <option key={talla} value={talla}>
                                                {talla}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button className="btn btnPersonalizado" onClick={handleAddToCart} type="submit" id="add-to-wishlist-btn">Añadir al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Productos;