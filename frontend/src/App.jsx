import { useState } from 'react';
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   <>
   <Login/>
   </>
  )
}

export default App
