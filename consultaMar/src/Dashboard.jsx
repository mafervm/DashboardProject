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
  const [selectedTipos, setSelectedTipos] = useState([])
  const [selectedTamanos, setSelectedTamanos] = useState([])
  const [selectedManiobras, setSelectedManiobras] = useState([])

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

      setSelectedTipos([])
      setSelectedTamanos([])
      setSelectedManiobras([])
      setDashData(data.rows || [])
      setOpenModal(false)
    } catch (error) {
      console.error('Error al cargar VVDash:', error)
    } finally {
      setLoading(false)
    }
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
        <DashboardSummary 
        data={dashData}
        selectedTipos={selectedTipos}
        selectedTamanos={selectedTamanos}
        selectedManiobras={selectedManiobras}

        onClearTipos = {() => setSelectedTipos([])}
        onClearTamanos = {() => setSelectedTamanos([])}
        onClearManiobras = {() => setSelectedManiobras([])}
        />

        <div className="dashboard-table-area">
          <DashboardTable 
          data={dashData}
          selectedTipos={selectedTipos}
          setSelectedTipos={setSelectedTipos}
          selectedTamanos={selectedTamanos}
          setSelectedTamanos={setSelectedTamanos}
          selectedManiobras={selectedManiobras}
          setSelectedManiobras={setSelectedManiobras}
          />
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

    </main>
  )
}

export default Dashboard

