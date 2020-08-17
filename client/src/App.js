import React from 'react';
import axios from 'axios';

// STYLES
import './App.css';

// COMPONENTS
import MapPage from './pages/MapPage/MapPage';
import Footer from './components/Footer/Footer';

axios.defaults.baseURL =
  'https://europe-west3-treemapper-gfg.cloudfunctions.net/api';

const App = () => {
  return (
    <>
      <MapPage />
      {/* <Footer /> */}
    </>
  );
};

export default App;
