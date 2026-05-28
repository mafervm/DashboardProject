import React, { useEffect, useState } from 'react'
import '/styles/FechaHora.css'

const FechaHora = () => {
    const [fechaHora, setFechaHora] = useState("");
    useEffect(() => {
        const obtenerFechaHora= async () => {
            const response = await fetch(
                "https://timeapi.io/api/Time/current/zone?timeZone=America/Mexico_City"
            );

            const data = await response.json();

            const fechaFormateada = `
            ${data.day}/${data.month}/${data.year}
            ${data.hour}:${data.minute}:${data.seconds}
            `;

            setFechaHora(fechaFormateada);
        };
        obtenerFechaHora();

        const intervalo = setInterval(obtenerFechaHora, 1000);
        return () => clearInterval(intervalo);

    }, []);

  return (
    <div className = "fecha-hora-container">
        {fechaHora}
    </div>
  );
};

export default FechaHora