import React, { useState } from 'react'
import ActionButtons from './componentes/ActionButtons'
import DashboardTable from './componentes/DashboardTable'
import BuqueViajeModal from './componentes/BuqueViajeModal'
import FechaHora from './componentes/FechaHora/FechaHora'
import Clima from './componentes/Clima/Clima'

const Dashboard = () => {
    const [openModal, setOpenModal] = useState(false);

  return (
    <main className="dashboard-page">
  <section className="dashboard-top">
    <div className="dashboard-widgets">
      <FechaHora />
      <Clima />
    </div>

    <ActionButtons onOpenBuqueModal={() => setOpenModal(true)} />
  </section>

  <DashboardTable />

  <BuqueViajeModal
    isOpen={openModal}
    onClose={() => setOpenModal(false)}
  />
</main>
  )
}

export default Dashboard