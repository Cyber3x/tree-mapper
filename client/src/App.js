import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// BUMBAG
import { Provider as BumbagProvider } from 'bumbag';

// CUSTOM THEME
import theme from './util/theme';

// COMPONENTS
import MapPage from './pages/MapPage/MapPage';
import MyTrees from './pages/MyTrees/MyTrees';
import Navbar from './components/Navbar/Navbar';

// axios.defaults.baseURL =
//   'https://europe-west3-treemapper-gfg.cloudfunctions.net/api';

const App = () => {
  return (
    <BumbagProvider theme={theme}>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/" children={<MapPage />} />
          <Route exact path="/my-trees" children={<MyTrees />} />
          <Route path="/" children={<h1>404 not found</h1>} />
        </Switch>
      </Router>
    </BumbagProvider>
  );
};

export default App;
