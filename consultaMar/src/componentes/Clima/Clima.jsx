import React, { useEffect, useState } from "react";
import '/styles/Clima.css'

const Clima = () => {

  const [clima, setClima] = useState(null);

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(
      async (position) => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`
        );

        const data = await response.json();

        setClima(data.current);
      },

      (error) => {
        console.log("Error al obtener la ubicación", error);
      }
    );

  }, []);

  if (!clima) {
    return <div>Cargando clima...</div>;
  }

  return (
    <div className="clima-container">

      <h3 className="clima-title">Clima Actual</h3>

      <p>
        🌡️ {clima.temperature_2m}°C
      </p>

      <p>
        💧 Humedad: {clima.relative_humidity_2m}%
      </p>

    </div>
  );
};

export default Clima;