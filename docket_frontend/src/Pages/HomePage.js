import React from 'react';
import Dashboard from '../Components/dashboard/Dashboard';
import NavBar from '../Components/NavBar/NavBar';
import './HomePage.css'
function HomePage() {

  return (
    <div className='home-page'>
      <NavBar />
      <Dashboard />
    </div>
  )
}

export default HomePage
