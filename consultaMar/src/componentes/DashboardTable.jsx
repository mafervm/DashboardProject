import React from 'react'
import '/styles/DashboardTable.css'

const DashboardTable = () => {
  return (
    <div className= "table-container">
        <table className="dashboard-table">
            <thead>
                <tr>
                    <th>Contenedor</th>
                    <th>Tipo</th>
                    <th>Tamaño</th>
                    <th>Ubicación</th>
                    <th>Grua</th>
                    <th>F. de Ejecución</th>
                    <th>Estado</th>
                    <th>Sellos</th>
                    <th>IMOs</th>
                    <th>T. Maniobra</th>
                    <th>Peso(kg)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan = '11' className= "empty-message">
                        No hay datos disponibles.
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
  )
}

export default DashboardTable