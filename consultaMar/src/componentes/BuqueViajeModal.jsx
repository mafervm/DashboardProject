import React, { useState } from 'react'
import '/styles/BuqueViajeModal.css'

const BuqueViajeModal = ({ isOpen, onClose, onAgregar }) => {
  const [search, setSearch] = useState('')
  const [selectedViaje, setSelectedViaje] = useState(null)
  const [showOptions, setShowOptions] = useState(false)

  const opciones = [
    {
      intVesselVoyageId: 11020,
      strVesselName: 'MEXICO EXPRESS',
      strVesselVoyage: '26 /6 - MEXICO EXPRESS',
      dteVesselVoyageArrivalDate: '2026-06-26T01:00:00.000-0500',
    },
    {
      intVesselVoyageId: 11024,
      strVesselName: 'APL CALIFORNIA',
      strVesselVoyage: '14 /6 - APL CALIFORNIA',
      dteVesselVoyageArrivalDate: '2026-06-14T01:00:00.000-0500',
    },
  ]

  const opcionesFiltradas = opciones.filter((opcion) =>
    opcion.strVesselVoyage.toLowerCase().includes(search.toLowerCase()) ||
    opcion.strVesselName.toLowerCase().includes(search.toLowerCase())
  )

  if (!isOpen) return null

  const handleSelect = (viaje) => {
    setSelectedViaje(viaje)
    setSearch(viaje.strVesselVoyage)
    setShowOptions(false)
  }

  const handleAdd = () => {
    if (!selectedViaje) return

    onAgregar(selectedViaje.intVesselVoyageId)
    setSearch('')
    setSelectedViaje(null)
    setShowOptions(false)
  }

  const handleClose = () => {
    setSearch('')
    setSelectedViaje(null)
    setShowOptions(false)
    onClose()
  }

  const formatFecha = (fecha) => {
    if (!fecha) return ''

    return new Date(fecha).toLocaleDateString('es-MX')
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="buque-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Selección de Buque–Viajes</h2>

          <button type="button" className="close-button" onClick={handleClose}>
            x
          </button>
        </div>

        <div className="modal-body">
          <label>Selecciona Buque–Viaje:</label>

          <div className="combo-container">
            <input
              type="text"
              className="modal-input combo-input"
              value={search}
              placeholder="Selecciona buque-viaje..."
              onChange={(e) => {
                setSearch(e.target.value)
                setSelectedViaje(null)
                setShowOptions(true)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()

                  if (selectedViaje) {
                    handleAdd()
                    return
                  }
                  if (opcionesFiltradas.length > 0) {
                    handleSelect(opcionesFiltradas[0])
                    onAgregar(opcionesFiltradas[0].intVesselVoyageId)
                    setSearch('')
                    setSelectedViaje(null)
                    setShowOptions(false)
                  }
                }
              }}
            />

            <button
              type="button"
              className="combo-arrow"
              onClick={() => setShowOptions(!showOptions)}
            >
              ▼
            </button>

            {showOptions && (
              <div className="combo-options">
                {opcionesFiltradas.length === 0 ? (
                  <div className="combo-empty">
                    No se encontraron resultados
                  </div>
                ) : (
                  opcionesFiltradas.map((viaje) => (
                    <button
                      type="button"
                      key={viaje.intVesselVoyageId}
                      className="combo-option"
                      onClick={() => handleSelect(viaje)}
                    >
                      {viaje.strVesselVoyage}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <label>Buque:</label>
          <input
            type="text"
            className="modal-input"
            value={selectedViaje?.strVesselName || ''}
            readOnly
          />

          <label>Buque–Viaje:</label>
          <input
            type="text"
            className="modal-input"
            value={selectedViaje?.strVesselVoyage || ''}
            readOnly
          />

          <label>Fecha de llegada:</label>
          <input
            type="text"
            className="modal-input"
            value={formatFecha(selectedViaje?.dteVesselVoyageArrivalDate)}
            placeholder="dd/mm/aaaa"
            readOnly
          />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="add-button"
            onClick={handleAdd}
            disabled={!selectedViaje}
          >
            Agregar
          </button>

          <button type="button" className="cancel-button" onClick={handleClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuqueViajeModal