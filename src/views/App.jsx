import { useState } from 'react'
import '../App.css'
import { Outlet, Link } from "react-router-dom";
import Navbar from '../components/Navbar';

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App container">
    <Navbar />
      <header className="App-header">
        <Outlet/>
      </header>
    </div>
  )
}

export default App
