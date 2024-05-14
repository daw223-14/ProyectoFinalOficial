import React, { useEffect, useState } from 'react';
import '../styles/Notificacion.css';

const Notification = ({ text, onClose, show}) => {
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {
    setShowNotification(show)
  }, [show])
  const closeNotification = () => {
    setShowNotification(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    showNotification && (
      <div className="notification-container">
        <div className="notification-popup">
          <i type="button" className="bi bi-x-lg close-button" aria-label="Close" onClick={closeNotification}></i>
          <div className="notification-content">
            <p>{text}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Notification;
