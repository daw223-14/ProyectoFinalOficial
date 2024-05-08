import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from "./AppContext";
export default function Nav2() {
    const { isUserLogged, handleLogout } = useContext(AppContext);
    const logOut = () => {
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        handleLogout(); // Actualizar el estado de autenticación en el contexto
    };
    return (
        <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <a className="nav-link" href="#">
                    <i className="bi bi-search"></i>
                    <span className="ms-1 d-lg-none">Buscar</span>
                </a>
            </li>
            <li className="nav-item dropstart">
                <a className="nav-link btn btn-white dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false" >
                    <i className="bi bi-person-fill"></i>
                    <span className="ms-1 d-lg-none">Cuenta</span>
                </a>
                <ul className="dropdown-menu">
                    {!isUserLogged && (
                        <>
                            <li className='dropdown-item'>
                                <NavLink to="/login">Iniciar Sesión</NavLink>
                            </li>
                            <li className="dropdown-item">
                                <NavLink to="/registro">Regístrate</NavLink>
                            </li>
                        </>
                    )}
                    {isUserLogged && (
                        <>
                            <li className='dropdown-item'>
                                <span className="navlinkName">¡Bienvenido!</span>
                            </li>
                            <li className='dropdown-item'>
                                <NavLink to="/" onClick={logOut} className="custom-active-class dropdown-item">Cerrar Sesión</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    <i className="bi bi-cart3"></i>
                    <span className="ms-1 d-lg-none">Carrito</span>
                </a>
            </li>
        </ul>
    );
}
