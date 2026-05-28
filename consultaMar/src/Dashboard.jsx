import React, { useState } from 'react'
import ActionButtons from './componentes/ActionButtons'
import DashboardTable from './componentes/DashboardTable'
import BuqueViajeModal from './componentes/BuqueViajeModal'
import FechaHora from './componentes/FechaHora/FechaHora'
import Clima from './componentes/Clima/Clima'

const Dashboard = () => {
    const [openModal, setOpenModal] = useState(false);

  return (
    <main style={{ padding: "30px"}}>
        <ActionButtons onOpenBuqueModal= {() => setOpenModal(true)} />
        <DashboardTable />
        <BuqueViajeModal 
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        />
        <FechaHora/>
        <Clima/>
    </main>
  )
}

export default Dashboard