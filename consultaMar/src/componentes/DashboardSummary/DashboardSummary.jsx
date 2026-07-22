import React from 'react'
import '/styles/DashboardSummary.css'

const DashboardSummary = ({ data = [] }) => {
  const totalRegistros = data.length

  const carga = data.filter(
    (item) => item.strManeuverType === 'Carga'
  ).length

  const descarga = data.filter(
    (item) => item.strManeuverType === 'Descarga'
  ).length

  const tamano20 = data.filter(
    (item) => String(item.strContainerSizeIdentifier).trim() === '20'
  ).length

  const tamano40 = data.filter(
    (item) => String(item.strContainerSizeIdentifier).trim() === '40'
  ).length

  return (
    <aside className="dashboard-summary">
      <div className="summary-title">
        <h2>RESUMEN DE TABLA</h2>
        <span>BuqueViaje</span>
      </div>

      <div className="summary-section">
        <h3>Carga / Descarga</h3>

        <div className="summary-bars">
          <div className="summary-row">
            <span>Carga</span>
            <div className="summary-bar">
              <div
                className="summary-bar-fill"
                style={{
                  width: totalRegistros
                    ? `${(carga / totalRegistros) * 100}%`
                    : '0%',
                }}
              />
            </div>
            <strong>{carga}</strong>
          </div>

          <div className="summary-row">
            <span>Descarga</span>
            <div className="summary-bar">
              <div
                className="summary-bar-fill"
                style={{
                  width: totalRegistros
                    ? `${(descarga / totalRegistros) * 100}%`
                    : '0%',
                }}
              />
            </div>
            <strong>{descarga}</strong>
          </div>
        </div>
      </div>

      <div className="summary-section">
        <h3>Tamaño</h3>

        <div className="summary-bars">
          <div className="summary-row">
            <span>20</span>
            <div className="summary-bar">
              <div
                className="summary-bar-fill"
                style={{
                  width: totalRegistros
                    ? `${(tamano20 / totalRegistros) * 100}%`
                    : '0%',
                }}
              />
            </div>
            <strong>{tamano20}</strong>
          </div>

          <div className="summary-row">
            <span>40</span>
            <div className="summary-bar">
              <div
                className="summary-bar-fill"
                style={{
                  width: totalRegistros
                    ? `${(tamano40 / totalRegistros) * 100}%`
                    : '0%',
                }}
              />
            </div>
            <strong>{tamano40}</strong>
          </div>
        </div>
      </div>

      <div className="summary-total">
        Total de registros: <strong>{totalRegistros}</strong>
      </div>
    </aside>
  )
}

export default DashboardSummary