 
import './App.css';
import { HashRouter as Router, Switch } from 'react-router-dom';
 

import FrontendAuth from './FrontendAuth';


function App() {
  return (
    <Router>

      <Switch>

        <FrontendAuth />

      </Switch>

    </Router >
  );
}

export default App;
