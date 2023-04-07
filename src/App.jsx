import { useState, useEffect } from 'react'
import { FlashCard } from './components/flashcard/FlashCard.jsx';
import { Navbar } from './components/navbar/Navbar.jsx';
import './App.css'
import {Particles} from './components/Particles.jsx'


function App() {

  return (
    <div className="bg-stone-950 h-screen text-white w-screen">
        <Navbar/>
        <FlashCard/>
        <Particles/>
    </div>
  )
}

export default App

