import React, {useState} from "react";
import "../styles/Footer.css";
import axios from "./axios";
import Notificacion from "./Notificacion";

export default function Footer() {

  const [correo, setCorreo] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");


  function handleChange(event) {
    setCorreo(event.target.value);
  }
  const closeNotification = () => {
    setShowNotification(false);
    setNotificationText("");
  };  
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("correo", correo);
    axios
      .post("/subscribe.php", formData)
      .then((response) => {
        console.log(typeof response.data.mensaje);
        console.log(notificationText);
        console.log(showNotification);
        setNotificationText(response.data.mensaje)
        setShowNotification(true)
      })
      .catch((error) => {
        setNotificationText("Something went wrong!")
        console.error(error);
      });
      setCorreo("");
  }
  return (
    <footer className="bg-dark pb-0 text-white pt-4 mt-4">
      <div className="container">
        <div className="row justify-content-md-between gutter-2">

          <div className="order-md-1 col-md-8 col-lg-4">
            <div className="row">
              <div className="col">
                <h5 className="eyebrow mb-1">CYCLE'S</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-list-item"><a href="#" className="menu-list-link">Sobre Nosotros</a></li>
                  <li className="menu-list-item"><a href="#" className="menu-list-link">Terminos y Condiciones</a></li>
                  <li className="menu-list-item"><a href="#" className="menu-list-link">Prensa</a></li>
                  <li className="menu-list-item"><a href="#" className="menu-list-link">Ajustes de Privacidad</a></li>
                </ul>
              </div>
              <div className="col">
                <h5 className="eyebrow mb-1">Centro de Ayuda</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-list-item"><a href="#" className="menu-list-link">Shipping</a></li>
                  <li className="menu-list-item"><a href="#" className="menu-list-link">Devoluciones</a></li>
                  <li className="menu-list-item"><a href="#" className="menu-list-link">Pagos</a></li>
                  <li className="menu-list-item"><a href="#" className="menu-list-link">FAQ</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="order-md-3 col-md-8 col-lg-4">
            <h5 className="eyebrow mb-1">Subscribete a la Newsletter</h5>
            <div className="input-combined mb-3">
              <form onSubmit={handleSubmit}>
                <input type="email" className="form-control" id="email-input" placeholder="Tu correo..." value={correo} name="correo" aria-label="Your Email" aria-describedby="button-addon2" required
                onChange={handleChange} />
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Subscribete</button>
              </form>
            </div>
            <ul className="row list-unstyled">
              <li className="col"><a href="#!" className="text-white"><i className="bi bi-facebook"></i></a></li>
              <li className="col"><a href="#!" className="text-white"><i className="bi bi-instagram"></i></a></li>
              <li className="col"><a href="#!" className="text-white"><i className="bi bi-twitter"></i></a></li>
              <li className="col"><a href="#!" className="text-white"><i className="bi bi-linkedin"></i></a></li>
            </ul>
          </div>

          <div className="order-md-3 col-md-4 col-lg-3">
            <h5 className="eyebrow mb-1">Region & Currency</h5>
            <div className="select-frame mb-2">
              <select className="form-select form-select-lg mb-2" id="countrySelect2">
                <option value="1">United States</option>
                <option value="2">España</option>
              </select>
            </div>
            <div className="select-frame">
              <select className="form-select form-select-lg" id="curencySelect2">
                <option value="1">USD</option>
                <option value="2">EUR</option>
              </select>
            </div>
            <ul className="row mt-2 list-unstyled">
              <li className="col"><img src="src/assets/visa-1.svg" className="payment" alt="allwell" /></li>
              <li className="col"><img src="src/assets/master-card-1.svg" className="payment" alt="allwell" /></li>
              <li className="col"><img src="src/assets/amex-1.svg" className="payment" alt="allwell" /></li>
            </ul>
          </div>
        </div>
      </div>
      {showNotification && <Notificacion show={showNotification} onClose={closeNotification} text={notificationText} />}
    </footer>
  );
}
