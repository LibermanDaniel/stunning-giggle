import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AppRoutes } from './Routes';
import  StickyFooter from './components/StickyFooter'

/**
 * Add context API in here
 */

function App() {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <StickyFooter/>
    </div>
  );
}

export default App;
