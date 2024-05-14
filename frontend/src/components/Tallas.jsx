import React, { useState, useEffect } from "react";
import axios from "./axios";
import Notificacion from "./Notificacion";

function Tallas() {
    const [productoID, setProductoID] = useState("");
    const [productos, setProductos] = useState([]);

    const [tallaID, setTallaID] = useState("");
    const [tallas, setTallas] = useState([]);

    const [infoProductos, setInfoProductos] = useState([]);

    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");

    const closeNotification = () => {
        setShowNotification(false);
        setNotificationText("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "producto") {
            setProductoID(value);
        } else if (name === "talla") {
            setTallaID(value);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('productoID', productoID);
        data.append('tallaID', tallaID);
        try {
            const response = await axios.post("/tallas.php", data);
            setNotificationText(response.data.mensaje);
            setShowNotification(true);
            fetchData();
            setProductoID("");
            setTallaID("");
        } catch (error) {
            console.error(error);
            setNotificationText("Hubo un error al insertar datos");
            setShowNotification(true);
        }
    };
    async function fetchData() {
        try {
            const response = await axios.get("/tallas.php");
            setProductos(response.data.productos);
            setTallas(response.data.tallas);
            setInfoProductos(response.data.infoProductos);
        } catch (error) {
            console.error(error);
            setProductos([]);
            setTallas([]);
            setInfoProductos([]);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (productoID, tallaID) => {
         
        try {
            const response = await axios.delete("/tallas.php", { data: { productoID, tallaID } });
            setNotificationText(response.data.mensaje);
            setShowNotification(true);
            fetchData();
        } catch (error) {
            console.error(error);
            setNotificationText("Hubo un error al eliminar la talla");
            setShowNotification(true);
        }
    };
    return (
        <div className="container" id="#tallas">
            <h3>Tallas</h3>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="producto" className="form-label">Zapatillas</label>
                <select className="form-select" name="producto" id="producto" value={productoID} onChange={handleInputChange} >
                    <option value="">Selecciona un producto</option>
                    {productos.map((product) => (
                        <option key={product.productoID} value={product.productoID}>
                            {product.productoID + " " + product.nombre}
                        </option>
                    ))}
                </select>
                <label htmlFor="talla" className="form-label">Tallas Disponibles</label>
                <select className="form-select" name="talla" id="talla" value={tallaID} onChange={handleInputChange} >
                    <option value="">Selecciona una talla</option>
                    {tallas.map((talla) => (
                        <option key={talla.tallaID} value={talla.tallaID}>
                            {talla.talla}
                        </option>
                    ))}
                </select>
                <button className="btn btn-primary" type="submit">Insertar</button>
                <button className="btn btn-danger" type="button" onClick={() => handleDelete(productoID, tallaID)}>Borrar</button>
            </form>


            <table className="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Tallas Disponibles</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.productoID}>
                            <td>{producto.productoID} - {producto.nombre}</td>
                            <td>
                                {tallas.map((talla) => (
                                    <span key={talla.tallaID}>
                                        {infoProductos.find((info) => info.productoID === producto.productoID && info.tallaID === talla.tallaID) && talla.talla}{' '}
                                    </span>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showNotification && (
                <Notificacion show={showNotification} onClose={closeNotification} text={notificationText} />
            )}
        </div>
    );
}

export default Tallas;
