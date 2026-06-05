import React, { useState } from 'react'
import '/styles/BuqueViajeModal.css'

const BuqueViajeModal = ({ isOpen, onClose, onAgregar }) => {
  const [search, setSearch] = useState('')

  if (!isOpen) return null

  const handleAdd = () => {
    onAgregar(search)
    setSearch('')
  }

  const handleClose = () => {
    setSearch('')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="buque-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Selección de Buque-Viajes</h2>

          <button
            type="button"
            className="close-button"
            onClick={handleClose}
          >
            x
          </button>
        </div>

        <div className="modal-body">
          <div className="search-field">
            <label>
              Buscar tipo de contenedor:
            </label>

            <input
              type="text"
              className="modal-input"
              value={search}
              placeholder="Ingresa el buque a buscar."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <label>Buque:</label>
          <input
            type="text"
            className="modal-input"
            value="Temporal"
            readOnly
          />

          <label>Buque-Viaje:</label>
          <input
            type="text"
            className="modal-input"
            value="11034"
            readOnly
          />

          <label>Fecha de llegada:</label>
          <input
            type="text"
            className="modal-input"
            placeholder="dd/mm/aaaa --:-- ----"
            readOnly
          />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="add-button"
            onClick={handleAdd}
          >
            Agregar
          </button>

          <button
            type="button"
            className="cancel-button"
            onClick={handleClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuqueViajeModal