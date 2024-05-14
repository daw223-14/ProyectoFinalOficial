import React from "react";

function Filtros({ handleChange, handleSubmit, search, marca, precio, resetOnClick }) {

  return (
    <section className="col col-auto col-xl-2 col-sm-3 mt-5">
      <div className="d-flex flex-row-reverse">
        <a className="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          <i className="bi bi-funnel"></i>
        </a>
      </div>
      <div className="collapse show m-5" id="collapseExample">
        <h4>Filtros</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="search" className="form-label">Buscador</label>
            <input className="form-control" id="search" type="text" placeholder="Buscar..." name="search" value={search} onChange={handleChange} />
          </div>
          <div className="row">
            <label className="form-label">Marca</label>
            <label>
              <input className="form-check-input" type="checkbox" name="marca" value="nike" checked={marca === "nike"} onChange={handleChange} />{" "}
              Nike
            </label>
            <label>
              <input className="form-check-input" type="checkbox" name="marca" value="adidas" checked={marca === "adidas"} onChange={handleChange} />{" "}
              Adidas
            </label>
            <label>
              <input className="form-check-input" type="checkbox" name="marca" value="puma" checked={marca === "puma"} onChange={handleChange} />{" "}
              Puma
            </label>
          </div>
          <div className="row">
            <label className="form-label" htmlFor="precio">Ordenar por precio</label>
            <input className="range" type="range" id="precio" name="precio" min="10" max="500" step="10" value={precio} onChange={handleChange} />
            <span id="priceValue">&lt;{precio}</span>
          </div>
          <input type="reset" className="btn btn-danger" onClick={resetOnClick} />
          <button className="btn btn-primary" type="submit" value="Buscar">
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}

export default Filtros;
