
import styles from './App.css';
import { HashRouter as Router, Switch } from 'react-router-dom';


import FrontendAuth from './FrontendAuth';
import routerMap from "@/routerMap";
import BaseTab from './compoent_d/base_tab/BaseTab';

function App() {
  return (
    <div className={styles.main}>
      <Router>
      <BaseTab />

        <Switch>

          <FrontendAuth routerConfig={routerMap} />
        </Switch>

      </Router >
    </div >

  );
}

export default App;
