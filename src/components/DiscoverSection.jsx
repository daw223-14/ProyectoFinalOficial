import React from "react";
import Categorias from "./CategoriasBanner";

function DiscoverSection() {
    return (
        <div className="container mt-4">
            <div className="row">
                <Categorias name="REBAJAS" link="on-sale" img="sneakerbanner1.png"  id="sale"/>
                <Categorias name="POPULAR" link="popular_items" img="sneakerbanner2.png" id="popular" />
                <Categorias name="ULTIMOS LANZAMIENTOS" link="recent_releases" img="sneakerbanner3.png" id="ultimos" />

            </div>
        </div>

    )
}

export default DiscoverSection;
