
import styles from './App.css';
import { HashRouter as Router, Switch } from 'react-router-dom';


import FrontendAuth from './FrontendAuth';
import routerMap from "@/routerMap";
import BaseTab from './compoent_d/base_tab/BaseTab';
import { useEffect,useRef, useState } from 'react';

 

function App() {

  const [content_m_t, setcontent_m_t] = useState("10px")
  useEffect(()=>{
    console.log("App useEffect "+ top_main)
  })
  const top_main = useRef()
  useEffect(()=>{
    console.log(top_main.current.clientHeight)
    setcontent_m_t(top_main.current.clientHeight+"px")
  })

  return (
    <div className={styles.main}>
      <Router>

        <div ref={top_main} className={styles.top_main}>
          <BaseTab />
        </div>

        <div className={styles.content_main} style={{paddingTop:content_m_t}}>
          <Switch>
            <FrontendAuth routerConfig={routerMap} />
          </Switch>
        </div>

      </Router >
    </div >

  );
}

export default App;
