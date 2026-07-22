import React, { useEffect, useState } from 'react'
import ActionButtons from './componentes/ActionButtons'
import DashboardTable from './componentes/DashboardTable'
import BuqueViajeModal from './componentes/BuqueViajeModal'
import FechaHora from './componentes/FechaHora/FechaHora'
import DashboardSummary from './componentes/DashboardSummary/DashboardSummary'
import '/styles/Dashboard.css'

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false)
  const [dashData, setDashData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop

      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const reachedBottom =
        scrollTop + windowHeight >= documentHeight - 20

      setIsAtBottom(reachedBottom)
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const getDashboardData = async (intVesselVoyageId) => {
    try {
      setLoading(true)

      const response = await fetch(
        'http://10.110.115.30:3009/getVVDash',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            intVesselVoyageId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('No se pudo obtener la información')
      }

      const data = await response.json()

      setDashData(data.rows || [])
      setOpenModal(false)
    } catch (error) {
      console.error('Error al cargar VVDash:', error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-info">
        <FechaHora />

        <ActionButtons
          onOpenBuqueModal={() => setOpenModal(true)}
        />
      </section>

      <section className="dashboard-content">
        <DashboardSummary data={dashData} />

        <div className="dashboard-table-area">
          <DashboardTable data={dashData} />
        </div>
      </section>

      <BuqueViajeModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onAgregar={getDashboardData}
      />

      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="loading-spinner"></div>
            <p>Cargando información...</p>
          </div>
        </div>
      )}

      <div className="scroll-buttons">
        {!isAtBottom ? (
          <button
            type="button"
            className="scroll-button"
            onClick={scrollToBottom}
            title="Ir al final"
          >
            🡣
          </button>
        ) : (
          <button
            type="button"
            className="scroll-button"
            onClick={scrollToTop}
            title="Ir al inicio"
          >
            🡡
          </button>
        )}
      </div>
    </main>
  )
}

export default Dashboard