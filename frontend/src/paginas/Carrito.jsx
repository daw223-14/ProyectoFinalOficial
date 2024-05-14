import React, { useState, useEffect, useContext } from "react";
import CarritoInfoUser from "../components/CarritoInfoUser";
import Pago from "../components/Pago";
import CarritoProductos from "../components/CarritoProductos";
import axios from "../components/axios";
import { AppContext } from "../components/AppContext";

function Checkout() {
    const [userData, setUserData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: ''
    });
    const { carritoItems, setCarritoItems } = useContext(AppContext);
    useEffect(() => {
        localStorage.setItem("carritoItems", JSON.stringify(carritoItems));
    }, [carritoItems]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            axios
                .post("/datosUsuarios.php", { token }, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (response.data.mensaje === "Usuario encontrado") {
                        setUserData(response.data.usuario);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <main className="full-block mt-5 mb-4">
            <div className="container p-4">
                <h2>Carrito de compra</h2>
                <div className="row">
                    <div className="col-10 col-lg-8 col-md-12 order-1">
                        <CarritoProductos />
                    </div>
                    <div className="col-12 col-lg-4 col-md-10 order-2">
                        <CarritoInfoUser handleInputChange={handleInputChange} nombre={userData.nombre}
                        correo={userData.correo} telefono={userData.telefono} direccion={userData.direccion} />
                    </div>
                </div>
                <div className="row mt-5">
                    <Pago userData={userData} />
                </div>
            </div>
        </main>
    )
}

export default Checkout;