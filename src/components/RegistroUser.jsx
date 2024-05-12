import React, { useState, useEffect, useContext } from "react";
import axios from "./axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import Notification from "./Notificacion";

function SignupForm() {
    const [formData, setFormData] = useState({
        nombre: "",
        username: "",
        correo: "",
        telefono: "",
        contraseña: "",
        contraseña2: "",
        direccion: "",
        terms: false,
    });
    const [errors, setErrors] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [signedUp, setSignedUp] = useState(false);

    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState("");

    const closeNotification = () => {
        setShowNotification(false);
        setNotificationText("");
        setMensaje("");
        if (signedUp) {
            navigate("/login");
        }
    };

    const navigate = useNavigate();
    const { isUserLogged, setIsUserLogged } = useContext(AppContext);

    useEffect(() => {
        if (isUserLogged) {
            navigate("/");
        }
    }, [isUserLogged, navigate]);

    function validation() {
        let errors = [];
        if (!formData.terms) {
            errors.push("* Tienes que aceptar los términos y condiciones");
        }

        if (!/^[a-zA-Z\s]+$/.test(formData.nombre)) {
            errors.push("Nombre Incorrecto. Por favor, introduce un nombre sin carácteres especiales.");
        }

        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(formData.username)) {
            errors.push("Nombre de usuario no válido. Debe de empezar por una letra.");
        }

        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.correo) || formData.correo.length > 70) {
            errors.push("Correo no válido. Debe de ser un correo válido y de menos de 70 caracteres");
        }

        if (!/^\d{1,70}$/.test(formData.telefono) || formData.telefono.length > 70) {
            errors.push("Numero de telefono no válido.");
        }

        if (formData.contraseña !== formData.contraseña2) {
            errors.push("Las contraseñas no coinciden");
        }

        if (formData.direccion.length > 128) {
            errors.push("La direccion debe de tener menso de 128 cáracteres");
        }

        return errors;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validation();

        setErrors(validationErrors);

        if (validationErrors.length > 0) {
            setNotificationText(validationErrors);
            setShowNotification(true);
            return;
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        axios
            .post("/registro.php", data)
            .then((response) => {
                const responseData = response.data;
                setMensaje(responseData.mensaje);
                setNotificationText(response.data.mensaje);
                setShowNotification(true);
                if (responseData.mensaje == "Usuario registrado correctamente.") {
                    setSignedUp(true);
                }
            })
            .catch((error) => {
                console.error("Error con el formulario:", error);
            });
    };

    useEffect(() => {
        if (mensaje !== "") {
            setNotificationText(mensaje);
            setShowNotification(true);
        }
    }, [mensaje]);


    return (
        <section className="mt-5 mb-4">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mb-sm-0 mb-4">
                        <h3>Registrate</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-2">
                                <div data-mdb-input-init className="col-sm form-outline mb-4">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input className="form-control form-control-lg" id="name" type="text" placeholder="Nombre..." name="nombre" value={formData.nombre} onChange={handleChange} required />
                                </div>
                                <div data-mdb-input-init className="col-sm form-outline mb-3">
                                    <label htmlFor="username" className="form-label">Nombre de Usuario </label>
                                    <input className="form-control form-control-lg" id="username" type="text" placeholder="Nombre de usuario..." name="username" value={formData.username} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="row g-2">
                                <div data-mdb-input-init className="col-sm form-outline mb-3">
                                    <label htmlFor="email" className="form-label">Correo electrónico </label>
                                    <input className="form-control form-control-lg" id="email" type="email" placeholder="Correo..." name="correo" value={formData.correo} onChange={handleChange} required />
                                </div>
                                <div data-mdb-input-init className="col-sm form-outline mb-3">
                                    <label htmlFor="phone" className="form-label">Teléfono</label>
                                    <input className="form-control form-control-lg" id="phone" type="number" placeholder="Número de teléfono..." name="telefono" value={formData.telefono} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="row g-2">
                                <div data-mdb-input-init className="col-sm form-outline mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input className="form-control form-control-lg" id="password" type="password" placeholder="Contraseña..." name="contraseña" value={formData.contraseña} onChange={handleChange} required />
                                </div>
                                <div data-mdb-input-init className="col-sm form-outline mb-3">
                                    <label htmlFor="password2" className="form-label">Repita la contraseña</label>
                                    <input className="form-control form-control-lg" id="password2" type="password" placeholder="Repite la contraseña..." name="contraseña2" value={formData.contraseña2} onChange={handleChange} required />
                                </div>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-3">
                                <label htmlFor="address" className="form-label">Dirección</label>
                                <input className="form-control form-control-lg" id="address" type="text" placeholder="Dirección..." name="direccion" value={formData.direccion} onChange={handleChange} required />
                            </div>
                            <div data-mdb-input-init className="form-outline mb-3">
                                <input className="form-check-input me-2" id="terms" type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} required />
                                <label className="form-check-label" htmlFor="terms">
                                    *Términos y condiciones
                                </label>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }} value="Log in">Regístrate</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">¿Ya tienes cuenta? <Link to={"./../login"} className="link-danger">Inicia Sesión!</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {showNotification && <Notification show={showNotification} onClose={closeNotification} text={notificationText} />}
        </section>
    );
}

export default SignupForm;