
import styles from './App.css';
import { HashRouter as Router, Switch } from 'react-router-dom';


import FrontendAuth from './FrontendAuth';
import routerMap from "@/routerMap";
import BaseTab from './compoent_d/base_tab/BaseTab';
import { useEffect,useRef, useState } from 'react';

const content_css={
  marginTop:'10px'
}

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

        <div  style={{marginTop:content_m_t,height:"100%"}}>
          <Switch>
            <FrontendAuth routerConfig={routerMap} />
          </Switch>
        </div>

      </Router >
    </div >

  );
}

export default App;
