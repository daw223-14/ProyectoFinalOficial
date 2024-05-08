import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "./axios";

function ProductsSection({ sectionTitle, sectionPhrase, filter, id }) {
    const [productos, setProductos] = useState([]);
    let saleSection = false;
    if (filter == "sale_percentage") {
        saleSection = true;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api.php", {
                    params: {
                        sort: filter,
                        limit: 8
                    },
                });
                setProductos(response.data);
            } catch (error) {
                console.error(error);
                setProductos([]);
            }
        };

        fetchData();
    }, [filter]);

    const mostrarProductos = productos.map((productos) => (
        <ProductCard
            key={productos.productoID}
            productName={productos.nombre}
            sinStock={false}
            productoID={productos.productoID}
            productType={productos.genero}
            precio={productos.precio}
            precio_anterior={productos.precio_anterior}
            sale={true}
            rutaimg={productos.rutaimg}
        />
    ));

    return (
        <section className="container-fluid products-featured full-block" id={id}>
            <div className="container">
                <div className="products-section_title">
                    <h3>{sectionTitle}</h3>
                    <p>{sectionPhrase}</p>
                </div>
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-4">
                    {mostrarProductos}
                </div>
            </div>
        </section>
    );
}

export default ProductsSection;
