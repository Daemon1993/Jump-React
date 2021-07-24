import logo from './logo.svg';
import './App.css';
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './features/home/Home';
import ManageHome from './features/task_manage/ManageHome';
import SelfU from './features/self_share/SelfU';
import Tech from './features/task_tech/Tech';



function App() {
  return (
    <Router>
      <div id="menu">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/tech" exact component={Tech} />
          <Route path="/self_u" exact component={SelfU} />
          <Route path="/manage" component={ManageHome} />

        </Switch>
      </div>
    </Router >
  );
}

export default App;
