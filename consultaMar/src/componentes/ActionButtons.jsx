import React from 'react'
import '/styles/ActionButtons.css'

const ActionButtons = ({onOpenBuqueModal}) => {
  return (
    <div className= "action-buttons">
      <button
        className='blue-btn'
        onClick={onOpenBuqueModal} >
            Selecionar BuqueViaje
        </button></div>
  )
}

export default ActionButtons