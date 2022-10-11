import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AppRoutes } from './Routes';

/**
 * Add context API in here
 */

function App() {
  useEffect(() => {  
    return () => {
      localStorage.clear()
    }
  })
  
  return (
    <div>
      <Navbar/>
      <AppRoutes />
    </div>
  )
}

export default App
