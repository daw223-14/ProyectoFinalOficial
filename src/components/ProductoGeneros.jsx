import React, { useState, useEffect } from "react";
import Filtros from "./Filtros";
import axios from "./axios";
import ProductCard from "./ProductCard";

function ClothesAccessoriesPage({genero}) {
  const [formValues, setFormValues] = useState({
    search: "",
    marca: "",
    precio: 500
  });
  const [productos, setProductos] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const resetOnClick = () =>{
    setFormValues({
      search: "",
      marca: "",
      precio: 500,
    })
    fetchData();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("/api.php", {
        params: {
          genero: genero,
          marca: formValues.marca,
          precio: formValues.precio,
          nombre: formValues.search
        }
      });
      setProductos(response.data);
    } catch (error) {
      console.error(error);
      setProductos([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api.php", {
        params: {
          genero: genero
        }
      });
      setProductos(response.data);
    } catch (error) {
      console.error(error);
      setProductos([]);
    }
  };
  let productosToRender = productos.map(product => {
    return (<ProductCard
              key={product.productoID}
              productName={product.nombre}
              sinStock={false}
              productoID={product.productoID}
              productType={product.marca}
              precio={product.precio}
              precio_anterior={product.precio_anterior}
              rutaimg={product.rutaimg}
            />)
  })
  let titulo;
  if (genero === "mujer") {
    titulo = "Mujer";
  } else if (genero === "hombre") {
    titulo = "Hombre";
  } else {
    titulo = "Niños";
  }
  return (
    <div className="container-fluid mt-5 mb-4">
      <div className="row">
        <Filtros
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          marca={formValues.marca}
          precio={formValues.precio}
          search={formValues.search}
          resetOnClick={resetOnClick}
        />
          <section className="col py-3 full-block" id="on-sale">
            <div className="container">
              <h2  className="pageTitle">
                {titulo}
                </h2>
              <div className="row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-4" id="clothes_grid">
                {productosToRender}
              </div>
            </div>
        </section>
      </div>
    </div>
  );
}

export default ClothesAccessoriesPage;