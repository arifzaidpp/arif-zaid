import { useState } from 'react';
import './App.css'
import Home from './pages/home/Home'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   <>
   <Home/>
   </>
  )
}

export default App
