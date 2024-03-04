import React, { useState, useEffect } from 'react';
import {io} from 'socket.io-client'; // Importa el módulo io de socket.io-client
import './App.css';

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
  });

  useEffect(() => {
    const socket = io("http://35.174.81.13:4000");
    socket.on("receiveData", (orden: any) => { // Asegúrate de tipar correctamente tus datos según tu estructura de datos
      console.log(orden);
      alert("Pago realizado: " + JSON.stringify(orden));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://54.89.191.56:3000/Api/orden', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Order submitted successfully!');
        // Limpiar los campos después de enviar
        setFormData({
          name: '',
          price: 0,
        });
      } else {
        console.error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="order-form">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Submit Order</button>
    </div>
  );
};

export default OrderForm;
