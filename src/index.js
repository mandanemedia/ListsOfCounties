// @flow
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import jsonData from "./data.json";
import Sidebar from "./sidebar"

const DataURL =
  "https://gist.githubusercontent.com/Icehunter/3fde165a38380d4072f6bcb6726f1a63/raw/4dadf7d7c485255c9fdd0fa5afa5fbc10d79990a/countries+states+cities.json";

const App = ({items=[]}) => {

  const [data, setData] = useState(items);

  /* 
  useEffect(() => {
    fetch(DataURL)
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }); 
  */
  
  return (<>
    { (data.length > 0) ? <Sidebar items={data} /> : <span>Loading</span>}
  </>);
};

ReactDOM.render(
  <App items={jsonData}/>
, document.getElementById("root"));
