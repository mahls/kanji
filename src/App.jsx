import { useState, useEffect } from 'react'
import { FlashCard } from './components/flashcard/FlashCard.jsx';
import { Navbar } from './components/navbar/Navbar.jsx';
import './App.css'

function App() {
  return (
    <div className="bg-stone-900 h-screen text-white w-screen">
        <Navbar/>
        <FlashCard/>
    </div>
  )
}

export default App

