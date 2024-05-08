import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginUser.css"
import axios from "./axios";
import { AppContext } from "./AppContext";
import Notification from "./Notificacion";

function LoginUser() {
    const [formData, setFormData] = useState({
        login_usuario_correo: "",
        login_contraseña: ""
    });
    const { isUserLogged, setIsUserLogged, handleLoginToken } = useContext(
        AppContext
    );

    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");
    const navigate = useNavigate();

    const closeNotification = () => {
        setShowNotification(false);
        setNotificationText("");
        if (isUserLogged) {
            navigate("/");
        }
    };

    useEffect(() => {
        if (isUserLogged && !showNotification) {
            navigate("/");
        }
    }, [isUserLogged, navigate, showNotification]);

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
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        axios
            .post("/login.php", data)
            .then((response) => {
                const loggedIn = JSON.parse(response.data.loggedin);
                setIsUserLogged(loggedIn);
                localStorage.setItem("isUserLogged", loggedIn);
                setNotificationText(response.data.mensaje);
                setShowNotification(true);
                if (loggedIn) {
                    handleLoginToken(response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                }
            })
            .catch((error) => {
                console.error("Error al enviar el formulario:", error);
            });
    };

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <h3>Login</h3>
                        <form onSubmit={handleSubmit}>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <label className="form-label" htmlFor="login_usuario_correo">Usuario o Correo</label>
                                <input type="text" id="login_usuario_correo" onChange={handleChange} className="form-control form-control-lg"
                                    value={formData.login_usuario_correo} name="login_usuario_correo" placeholder="Introduce usuario o correo" required/>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-3">
                                <label className="form-label" htmlFor="login_contraseña">Contraseña</label>
                                <input type="password" id="login_contraseña" className="form-control form-control-lg"
                                    onChange={handleChange} value={formData.login_contraseña} name="login_contraseña" placeholder="Introduce contraseña" required />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Recordar Usuario
                                    </label>
                                </div>
                                <a href="#!" className="text-body">¿Has olvidado tu contraseña?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}} value="Log in">Iniciar Sesión</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">¿No tienes cuenta? <Link to={"./../registro"} className="link-danger">Regístrate!</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
        </section>
    )
}
export default LoginUser;