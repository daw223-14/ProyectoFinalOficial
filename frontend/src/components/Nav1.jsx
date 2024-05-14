import { NavLink } from 'react-router-dom';
export default function Nav1() {
    return (
        <ul className="navbar-nav" style={{fontWeight: "bolder", fontSize: "20px"}}>
            <li className="nav-item px-3">
                <NavLink className="nav-link" to="/hombre">
                    Hombre
                </NavLink>
            </li>
            <li className="nav-item px-3">
                <NavLink className="nav-link" to="/mujer">
                    Mujer
                </NavLink>
            </li>
            <li className="nav-item px-3">
                <NavLink className="nav-link" to="/ninos">
                    Niños
                </NavLink>
            </li>
        </ul>
    );
}