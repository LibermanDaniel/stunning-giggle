import { Navbar } from './components/Navbar';
import StickyFooter from './components/StickyFooter';
import { AppRoutes } from './Routes';

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
