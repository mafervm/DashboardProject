import React, { useState } from 'react'
import ActionButtons from './componentes/ActionButtons'
import DashboardTable from './componentes/DashboardTable'
import BuqueViajeModal from './componentes/BuqueViajeModal'
import FechaHora from './componentes/FechaHora/FechaHora'
import Clima from './componentes/Clima/Clima'
import '/styles/Dashboard.css'

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false)
  const [dashData, setDashData] = useState([])

  const getDashboardData = async (searchText = '') => {
    const response = await fetch('http://10.110.115.30:3009/getVVDash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intVesselVoyageId: 11034,
      }),
    })

    const data = await response.json()
    const rows = data.rows || []

    if (searchText.trim() === '') {
      setDashData(rows)
    } else {
      const text = searchText.trim().toLowerCase()

      const filteredRows = rows.filter((item) =>
        item.strContainerTypeIdentifier?.toLowerCase() === text
      )

      setDashData(filteredRows)
    }

    setOpenModal(false)
  }

  return (
    <main className="dashboard-page">
      <ActionButtons onOpenBuqueModal={() => setOpenModal(true)} />

      <DashboardTable data={dashData} />

      <section className="dashboard-info">
        <FechaHora />
        <Clima />
      </section>

      <BuqueViajeModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onAgregar={getDashboardData}
      />
    </main>
  )
}

export default Dashboard