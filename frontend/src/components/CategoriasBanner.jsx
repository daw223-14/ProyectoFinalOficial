import React from "react";
import { NavLink } from "react-router-dom";
import "/src/styles/Card.css";

function CategoriasBanner(props) {
    const scrollToSection = (sectionId, targetPosition = 0) => {
        const section = document.getElementById(sectionId);
        if (section) {
            if (targetPosition > 0) {
                const targetPosition = section.offsetTop - 100;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            } else {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    return (
        <div className="col-lg-4 col-md-5 col-sm-12 mb-4 section">
            {props.To ? <NavLink to={props.To}>Explorar</NavLink> :
                <div className="card h-100" id={props.id}>
                    <div className="card-body">
                        <div className="category-description">
                            <div className="category-description_content" onClick={() => scrollToSection(props.link, 1)}>
                                <h2 className="card-title">{props.name}</h2>
                                <a>Explorar</a>
                                <img src={`src/assets/` + props.img} className="card-img-top img-fluid d-block mx-auto my-auto" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CategoriasBanner;