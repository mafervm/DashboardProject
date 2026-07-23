import React from 'react'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import '/styles/DashboardSummary.css'

const DashboardSummary = ({
  data = [],
  selectedTipos = [],
  selectedTamanos = [],
  selectedManiobras = [],

  onClearTipos,
  onClearTamanos,
  onClearManiobras,
}) => {
  const totalRegistros = data.length
  
  const colores = [

    '#e15759',
    '#76b7b2',
    '#edc949',
    '#af7aa1',
    '#ff9da7',    
    '#4e79a7',
    '#f28e2b',
    '#9c755f',    
    '#59a14f',
  ]
  
  const crearDatos = (
    selections,
    field
  ) => {

    return selections.map(
      (selection) => {
        const cantidad =
          data.filter(
            (item) =>
              String(
                item[field] || ''
              ).trim() === selection
          ).length

        return {
          name: selection,
          value: cantidad,
        }
      }
    )
  }

  const tipoData = crearDatos(
    selectedTipos,
    'strContainerTypeIdentifier'
  )

  const tamanoData = crearDatos(
    selectedTamanos,
    'strContainerSizeIdentifier'
  )

  const maniobraData = crearDatos(
    selectedManiobras,
    'strManeuverType'
  )

  const DonutChart = ({
    title,
    chartData,
    onClear,
  }) => {

    if (chartData.length === 0) {
      return null
    }

    return (
      <div className="summary-section">

        <div className="summary-graph-header">
          <h3>
            {title}
          </h3>
          <button
            type="button"
            className="clear-graph-button"
            onClick={onClear}
          >
            Limpiar
          </button>
        </div>
        <div className="donut-chart">
          <ResponsiveContainer
            width="100%"
            height={180}
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"

                cx="50%"
                cy="50%"

                innerRadius={45}
                outerRadius={70}

                paddingAngle={2}
              >
                {chartData.map(
                  (entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={
                        colores[
                          index %
                          colores.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="donut-legend">

          {chartData.map(
            (item, index) => (
              <div
                className="legend-item"
                key={item.name}
              >

                <span
                  className="legend-color"
                  style={{
                    backgroundColor:
                      colores[
                        index %
                        colores.length
                      ],
                  }}
                />

                <span className="legend-name">
                  {item.name}
                </span>

                <strong>
                  {item.value}
                </strong>
              </div>
            )
          )}
        </div>
      </div>
    )
  }

  const noGraphs =
    tipoData.length === 0 &&
    tamanoData.length === 0 &&
    maniobraData.length === 0

  return (
    <aside className="dashboard-summary">
      <div className="summary-title">
        <h2>
          RESUMEN DE TABLA
        </h2>
        <span>
          BuqueViaje
        </span>
      </div>
      {noGraphs && (
        <div className="summary-empty">
          <p>
            Selecciona opciones en Tipo,
            Tamaño o T. Maniobra para
            visualizar las gráficas.
          </p>
        </div>
      )}

      <DonutChart
        title="Tipo"
        chartData={tipoData}
        onClear={onClearTipos}
      />

      <DonutChart
        title="Tamaño"
        chartData={tamanoData}
        onClear={onClearTamanos}
      />

      <DonutChart
        title="T. Maniobra"
        chartData={maniobraData}
        onClear={onClearManiobras}
      />

      <div className="summary-total">
        Total de registros:{' '}
        <strong>
          {totalRegistros}
        </strong>
      </div>
    </aside>
  )
}

export default DashboardSummary