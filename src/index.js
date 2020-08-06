// @flow
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import jsonData from "./data.json";
import Sidebar from "./sidebar"

const DataURL =
  "https://raw.githubusercontent.com/mandanemedia/ListsOfCounties/master/src/countries%2Bstates%2Bcities.json";

const App = ({items=[]}) => {

  const [data, setData] = useState(items);
  
  // useEffect(() => {
  //   fetch(DataURL)
  //     .then(res => res.json())
  //     .then(data => {
  //       setData(data);
  //     });
  // }); 
  
  return (<>
    { (data.length > 0) ? <Sidebar items={data} /> : <span>Loading</span>}
  </>);
};

ReactDOM.render(
  <App items={jsonData}/>
, document.getElementById("root"));
