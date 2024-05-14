import React, { useState, useEffect } from "react";
import axios from "./axios";
import Notificacion from "./Notificacion";
import Tallas from "./Tallas";
import "../styles/Admin.css"

function Administrador() {
    const [producto, setProducto] = useState({
        productoID: "",
        nombre: "",
        genero: "",
        descripcion: "",
        marca: "",
        precio: "",
        cantidadVendido: "",
        fechaAnadido: "",
        rutaimg: "",
        precio_anterior: ""
    });
    const [productos, setProductos] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");

    const closeNotification = () => {
        setShowNotification(false);
        setNotificationText("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    }

    // Manejar la carga de la imagen
    const handleImageChange = (e) => {
        setProducto({ ...producto, imagen: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (producto.productoID) {
            editarProducto(producto.productoID);
        } else {
            agregarProducto(e);
        }
    };

    async function fetchData() {
        try {
            const response = await axios.get("/admin.php");
            setProductos(response.data.productos);
        } catch (error) {
            console.error(error);
            setProductos([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function agregarProducto(e) {
        e.preventDefault();

        const data = new FormData();
        Object.entries(producto).forEach(([key, value]) => data.append(key, value));
        try {
            await axios.post("/admin.php", data)
            setNotificationText('Producto agregado correctamente');
            setShowNotification(true);
            fetchData();
            resetProducto();
        } catch (error) {
            console.error(error);
            setNotificationText('Hubo un error al procesar el producto');
            setShowNotification(true);
        }
    }

    async function editarProducto(productoID) {
        try {
            await axios.put(`./admin.php?productoID= ${productoID}`, producto);
            setNotificationText("Producto actualizado correctamente");
            setShowNotification(true);
            fetchData();
            resetProducto();
        } catch (error) {
            console.error(error);
            setNotificationText('Hubo un error al editar el producto');
            setShowNotification(true);
        }
    }

    const resetProducto = () => {
        setProducto({
            nombre: "",
            genero: "",
            descripcion: "",
            marca: "",
            precio: "",
            cantidadVendido: "",
            fechaAnadido: "",
            rutaimg: "",
            precio_anterior: ""
        });
    };

    const handleEditar = (product) => {
        setProducto({
            ...producto,
            nombre: product.nombre,
            genero: product.genero,
            descripcion: product.descripcion,
            marca: product.marca,
            precio: product.precio,
            cantidadVendido: product.cantidadVendido,
            fechaAnadido: product.fechaAnadido,
            rutaimg: product.rutaimg,
            precio_anterior: product.precio_anterior,
            productoID: product.productoID
        });
    }

    async function eliminarProducto(productoID) {
        try {
            await axios.delete("./admin.php", { data: { productoID } });
            setNotificationText('Producto eliminado correctamente');
            setShowNotification(true);

            fetchData(); // Actualizar la lista de productos después de eliminar uno
        } catch (error) {
            console.error(error);
            setNotificationText('Hubo un error al eliminar el producto');
            setShowNotification(true);
        }
    }

    return (
        <div className="bg-secondary overflow-hidden d-flex justify-content-center align-items-center">
            <div className="container admin bg-light-subtle">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#productos">Productos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#tallas">Tallas</a>
                    </li>
                </ul>
                <h2>Administrar Productos</h2>
                <div id="productos">
                    <div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="row g-3">
                                <div className="col-sm">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input className="form-control" id="nombre" type="text" name="nombre" value={producto.nombre} onChange={handleInputChange} required />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="genero" className="form-label">Género</label>
                                    <select className="form-select" id="genero" type="text" name="genero" value={producto.genero} onChange={handleInputChange} required>
                                        <option value="">Selecciona el género</option>
                                        <option value="mujer">Mujer</option>
                                        <option value="hombre">Hombre</option>
                                        <option value="ninos">Niños</option>
                                    </select>
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="descripcion" className="form-label">Descripcion</label>
                                    <textarea className="form-control" id="descripcion" type="text" name="descripcion" value={producto.descripcion} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-sm">
                                    <label htmlFor="marca" className="form-label">Marca</label>
                                    <input className="form-control" id="marca" type="text" name="marca" value={producto.marca} onChange={handleInputChange} />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="precio" className="form-label">Precio</label>
                                    <div className="input-group">
                                        <input className="form-control" id="precio" type="number" name="precio" value={producto.precio} onChange={handleInputChange} />
                                        <span className="input-group-text">€</span>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="cantidadVendido" className="form-label">Cantidad Vendido</label>
                                    <input className="form-control" id="cantidadVendido" type="number" name="cantidadVendido" value={producto.cantidadVendido} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-sm">
                                    <label htmlFor="fechaAnadido" className="form-label">Fecha de añadido</label>
                                    <input className="form-control" id="fechaAnadido" type="Date" name="fechaAnadido" value={producto.fechaAnadido} onChange={handleInputChange} required />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="rutaimg" className="form-label">Ruta de la imagen</label>
                                    <input className="form-control" id="rutaimg" type="text" name="rutaimg" value={producto.rutaimg} onChange={handleInputChange} />
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="precio_anterior" className="form-label">Precio Anterior</label>
                                    <div className="input-group">
                                        <input className="form-control" id="precio_anterior" type="number" name="precio_anterior" value={producto.precio_anterior} onChange={handleInputChange} />
                                        <span className="input-group-text">€</span>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <button className="btn btn-success" type="submit">{producto.productoID ? 'Editar Producto' : 'Agregar Producto'}</button>
                        </form>
                    </div>
                    {showNotification && <Notificacion show={showNotification} onClose={closeNotification} text={notificationText} />}
                    <h3>Listado de Productos</h3>
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Género</th>
                                <th>Marca</th>
                                <th>Precio</th>
                                <th>Cantidad Vendido</th>
                                <th>Ruta imagen</th>
                                <th>Fecha Añadido</th>
                                <th>Precio anterior</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map(product => (
                                <tr key={product.productoID}>
                                    <td>{product.productoID}</td>
                                    <td>{product.nombre}</td>
                                    <td>{product.descripcion}</td>
                                    <td>{product.genero}</td>
                                    <td>{product.marca}</td>
                                    <td>{product.precio}€</td>
                                    <td>{product.cantidadVendido} unidades</td>
                                    <td>{product.rutaimg}</td>
                                    <td>{product.fechaAnadido}</td>
                                    <td>{product.precio_anterior}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm" onClick={() => handleEditar(product)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(product.productoID)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="tallas">
                    <Tallas />
                </div>
            </div>
        </div>
    );
}
export default Administrador;
