import React from "react"; 
import { Link } from 'react-router-dom';
import Nav1 from './Nav1';
import Nav2 from './Nav2';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
            <div className="container-fluid">
                <div className='collapse navbar-collapse justify-content-start order-1 order-lg-1'></div>
                <Link to="/" className="navbar-brand"><img src='src/assets/titulo.png' style={{ width: 100 }} /></Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-center order-2 order-lg-2" id="navbarNav">
                    <Nav1 />
                </div>
                <div className="collapse navbar-collapse justify-content-end order-3 order-lg-3" id="navbarNav">
                    <Nav2 />
                </div>
            </div>
        </nav>

    );
}
