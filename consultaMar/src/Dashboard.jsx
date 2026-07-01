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

  const getDashboardData = async (intVesselVoyageId) => {
    const response = await fetch('http://10.110.115.30:3009/getVVDash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ intVesselVoyageId }),
    })

    const data = await response.json()

    setDashData(data.rows || [])
    setOpenModal(false)
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-info">
        <FechaHora />
        <ActionButtons onOpenBuqueModal={() => setOpenModal(true)} />
      </section>

      <DashboardTable data={dashData} />

      <section className="dashboard-clima">
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
