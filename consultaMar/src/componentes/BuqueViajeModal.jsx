import React from 'react'
import '/styles/BuqueViajeModal.css'

const BuqueViajeModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  return (
    <div className="modal-overlay">

      <div className="buque-modal"
      onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">
            <h2>
                Selección de Buque-Viajes
            </h2>

            <button
            type="button" 
            className="close-button" 
            onClick={onClose}>
                x
            </button>

        </div>

        <div className="modal-body">
            <div className= "search-field">
                <label> 
                    Ingresa 3 caracteres para buscar Buque-Viaje: 
                </label>
                <div className="search-dropdown">
                    <input
                    type="text"
                    placeholder= "Buscar buque viaje..."/>
                    <span 
                    className= "dropdown-arrow" readOnly>
                        ⏷
                    </span>
                </div>
            </div>

            <label> 
                Buque: 
            </label>
            <input type="text" className="modal-input" readOnly />

            <label> 
                Buque-Viaje: 
            </label>
            <input 
            type="text" 
            className="modal-input" 
            readOnly />

            <label> 
                Fecha de llegada: 
            </label>
            <input 
            type="text"
            className="modal-input" 
            placeholder = "dd/mm/aaaa --:-- ----" 
            readOnly />

        </div>

        <div className="modal-footer">
            <button className= "add-button">
                Agregar
            </button>

            <button className= "cancel-button" onClick={onClose}>
                Cancelar
            </button>

        </div>
      </div>
    </div>
  )
}

export default BuqueViajeModal