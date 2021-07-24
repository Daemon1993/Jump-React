import logo from './logo.svg';
import './App.css';
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './features/home/Home';

import loadable from '@loadable/component';



const ManageHome = loadable(() => import('./features/task_manage/ManageHome'))
const SelfU = loadable(() => import('./features/self_share/SelfU'))
const Tech = loadable(() => import('./features/task_tech/Tech'))


function App() {
  return (
    <Router>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tech" exact component={Tech} />
        <Route path="/self_u" exact component={SelfU} />
        <Route path="/manage" component={ManageHome} />

      </Switch>

    </Router >
  );
}

export default App;
