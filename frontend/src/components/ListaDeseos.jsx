import React, {useContext} from "react";
import { AppContext } from "./AppContext";
import ProductCard from "./ProductCard";
function ListaDeseos() {
    const { listaDeseos, setListaDeseos } = useContext(AppContext);

    let listaRender = listaDeseos.map(productos => {
        return (<ProductCard
            key={productos.productoID}
            productName={productos.productName}
            sinStock={false}
            productoID={productos.productoID}
            productType={productos.genero}
            precio={productos.precio}
            precio_anterior={productos.precio_anterior}
            rutaimg={productos.rutaimg}
        />)
    })
    return (
        <section className="container-fluid products-featured full-block">
        <div className="container">
            <div className="products-section_title">
            <h2 className="pageTitle">Lista de deseos</h2>
            </div>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-4">
                {listaRender}
            </div>
        </div>
    </section>
    )
}
export default ListaDeseos;