import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";
import "./../styles/Login.css";
import { AppContext } from "./AppContext";
import Notificacion from "./../components/Notificacion";

function LoginAdmin() {
    const [formData, setFormData] = useState({
        usuario: "",
        contraseña: ""
    });
    const { setIsUserLogged, handleLoginToken } = useContext(AppContext);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const navigate = useNavigate();

    const closeNotification = () => {
        setShowNotification(false);
        setNotificationText("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));

        axios
            .post("./loginAdmin.php", data)
            .then((response) => {
                const loggedIn = JSON.parse(response.data.loggedin);
                setIsUserLogged(loggedIn);
                localStorage.setItem("isAdminLogged", loggedIn);
                setNotificationText(response.data.mensaje);
                setShowNotification(true);

                if (loggedIn) {
                    handleLoginToken(response.data.token);
                    navigate("/admin");
                }
            })
            .catch((error) => {
                console.error("Error al enviar el formulario:", error);
                setNotificationText("Error al iniciar sesión. Por favor, intenta de nuevo.");
                setShowNotification(true);
            });
    };

    return (
        <section className="background-radial-gradient overflow-hidden d-flex justify-content-center align-items-center vh-100">
            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-5">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "#E1E8F6"}}>
                            Cycle<br />
                            <span style={{color: "#6B87C1"}}>Administrator </span>
                        </h1>
                    </div>
                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        <div className="card bg-glass" style={{borderRadius: "30px"}}>
                            <div className="card-body px-4 py-5 px-md-5" >
                                <form onSubmit={handleSubmit}>
                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="usuario">Usuario</label>
                                        <input id="usuario" className="form-control" onChange={handleChange} value={formData.usuario} type="text" name="usuario" required />
                                    </div>
                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="contraseña">Contraseña</label>
                                        <input type="password" id="contraseña" className="form-control" onChange={handleChange} value={formData.contraseña} name="contraseña" required />
                                    </div>
                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                                        Iniciar Sesion
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showNotification && <Notificacion show={showNotification} onClose={closeNotification} text={notificationText} />}
        </section>
    )
}

export default LoginAdmin;