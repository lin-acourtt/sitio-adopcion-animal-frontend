import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


import AdoptionPage from './components/adoption-page/AdoptionPage.jsx'
import AnimalProfilePage from './components/animal-profile-page/AnimalProfilePage.jsx'
import DonationPage from './components/donation-page/DonationPage.jsx'
import AboutUsPage from './components/aboutus-page/AboutUsPage.jsx'
import NotFoundPage from './components/notfound-page/NotFoundPage.jsx'

import { BrowserRouter, Routes, Route } from "react-router";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<AdoptionPage />} />
          <Route path="/perfil/:id" element={<AnimalProfilePage />} />
          <Route path="/donacion" element={<DonationPage />} />
          <Route path="/sobre-nosotros" element={<AboutUsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
