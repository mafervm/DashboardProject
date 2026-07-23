import React, {useState} from "react";
import ColumnSelector from "./ColumnSelector";
import "/styles/DashboardTable.css";

const DashboardTable = ({
  data = [],

  selectedTipos,
  setSelectedTipos,

  selectedTamanos,
  setSelectedTamanos,

  selectedManiobras,
  setSelectedManiobras,
}) => {

const [openColumn, setOpenColumn] = useState('')

const tipos = [
  ...new Set(
    data
      .map((item) =>
        String(
          item.strContainerTypeIdentifier || ''
        ).trim()
      )
      .filter(Boolean)
  ),
]

const tamanos = [
  ...new Set(
    data
      .map((item) =>
        String(
          item.strContainerSizeIdentifier || ''
        ).trim()
      )
      .filter(Boolean)
  ),
]

const maniobras = [
  ...new Set(
    data
      .map((item) =>
        String(
          item.strManeuverType || ''
        ).trim()
      )
      .filter(Boolean)
  ),
]

  return (
    <div className="table-container">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Contenedor</th>

            <th>
              <ColumnSelector
              title="Tipo"
              columnKey="tipo"
              options={tipos}
              selected={selectedTipos}
              setSelected={setSelectedTipos}
              openColumn={openColumn}
              setOpenColumn={setOpenColumn}
              //maxSelections={5}
              />
              </th>

            <th>
              <ColumnSelector
              title="Tamaño"
              columnKey="tamano"
              options={tamanos}
              selected={selectedTamanos}
              setSelected={setSelectedTamanos}
              openColumn={openColumn}
              setOpenColumn={setOpenColumn}
              />
            </th>

            <th>Ubicación</th>
            <th>Grua</th>
            <th>F. de Ejecución</th>
            <th>Estado</th>
            <th>Sellos</th>
            <th>IMOs</th>
            <th>
              <ColumnSelector
              title="T. Maniobra"
              columnKey="maniobra"
              options={maniobras}
              selected={selectedManiobras}
              setSelected={setSelectedManiobras}
              openColumn={openColumn}
              setOpenColumn={setOpenColumn}
              />
            </th>
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
              <td className="sellos-cell">{String(item.strContainerSealNumber || '').trim() ? (
                String(item.strContainerSealNumber)
                  .split(',')
                  .map((sello, index) => (
                    <div key={index}>
                      {sello.trim()}
                    </div>
                  ))
              ) : (
                '-'
              )}
              </td>
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