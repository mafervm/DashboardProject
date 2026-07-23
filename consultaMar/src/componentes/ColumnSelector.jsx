import React from 'react'

const ColumnSelector = ({
  title,
  columnKey,
  options,
  selected,
  setSelected,
  openColumn,
  setOpenColumn,
  maxSelections,
}) => {
  const isOpen = openColumn === columnKey

  const handleChange = (option) => {
    if (selected.includes(option)) {
      setSelected(
        selected.filter((item) => item !== option)
      )
      return
    }

    if (
      maxSelections &&
      selected.length >= maxSelections
    ) {
      return
    }

    setSelected([
      ...selected,
      option,
    ])
  }

  const limitReached =
    maxSelections &&
    selected.length >= maxSelections

  return (
    <div className="column-selector">

      <button
        type="button"
        className="column-selector-button"
        onClick={() =>
          setOpenColumn(
            isOpen ? '' : columnKey
          )
        }
      >
        {title} ▼
      </button>

      {isOpen && (
        <div className="column-selector-menu">

          <span className="selector-text">
            Selecciona para ver su gráfica:
          </span>

          {maxSelections && (
            <span className="selector-limit">
              Máximo {maxSelections} opciones
            </span>
          )}

          {options.map((option) => {
            const isChecked =
              selected.includes(option)

            const isDisabled =
              limitReached &&
              !isChecked

            return (
              <label
                key={option}
                className={`selector-option ${
                  isDisabled
                    ? 'selector-option-disabled'
                    : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() =>
                    handleChange(option)
                  }
                />

                {option}
              </label>
            )
          })}

        </div>
      )}

    </div>
  )
}

export default ColumnSelector

