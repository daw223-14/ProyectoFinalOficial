import React from "react";

function CarritoInfoUser(props) {
    return (
        <div className="user-data bg-light p-3 rounded">
        <h4>Datos de envio</h4>
            <form>
                <label className="form-label">Usuario</label>
                <input className="form-control" type="text" name="nombre" value={props.nombre} onChange={props.handleInputChange} />
                <label className="form-label">Email</label>                
                <input className="form-control" type="email" name="correo" value={props.correo} onChange={props.handleInputChange} />
                <label className="form-label">Telefono</label>
                <input className="form-control" type="tel" name="telefono" value={props.telefono} onChange={props.handleInputChange}/>
                <label className="form-label">Direccion</label>
                <textarea className="form-control" name="direccion" value={props.direccion} onChange={props.handleInputChange} />
            </form>
        </div>
    );
};

export default CarritoInfoUser;
