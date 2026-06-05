import React from "react";
import "/styles/DashboardTable.css";

const DashboardTable = ({ data = [] }) => {
  return (
    <div className="table-container">
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
          {data.length === 0 ? (
            <tr>
              <td colSpan="11" className="empty-message">
                No hay datos disponibles.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
            <tr key={index}>
              <td>{String(item.strContainerId || '').trim() || '—'}</td>
              <td>{String(item.strContainerTypeIdentifier || '').trim() || '—'}</td>
              <td>{String(item.strContainerSizeIdentifier || '').trim() || '—'}</td>
              <td>{String(item.strVesselPositionIdentifier || '').trim() || '—'}</td>
              <td>{String(item.strCraneIdentifier || '').trim() || '—'}</td>
              <td>{String(item.dtExecutionDate || '').trim() || '—'}</td>
              <td>{String(item.strContFisStatusIdentifier || '').trim() || '—'}</td>
              <td>{String(item.strContainerSealNumber || '').trim() || '—'}</td>
              <td>{String(item.strIMOCodeIdentifier || '').trim() || '—'}</td>
              <td>{String(item.strManeuverType || '').trim() || '—'}</td>
              <td>{String(item.decContainerInventoryVGW || '').trim() || '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;