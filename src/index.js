import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import jsonData from "./data.json";

const DataURL =
  "https://gist.githubusercontent.com/Icehunter/3fde165a38380d4072f6bcb6726f1a63/raw/4dadf7d7c485255c9fdd0fa5afa5fbc10d79990a/countries+states+cities.json";

const SidebarItem = ({data, depth=0}) => (
    <div className="menuList">
        {
            data.map( ({name, id, ...props}) => {
                return (<>
                    <div className="menuListItem" key={id} style={{ paddingLeft: depth }} >
                        <span className="ListItemText">{name}</span>
                    </div>
                    {props.states ? <SidebarItem data={props.states} depth={depth+20} /> : null }
                    {props.cities ? <SidebarItem data={props.cities} depth={depth+20} /> : null }
                </>)
            })
        }
    </div>
)

const Sidebar = ({items}) => 
 {
  return (
    <div  className="sidebar">
        <SidebarItem data={items} depth={0} />
    </div>
  )
}

const App = ({items=[]}) => {
  // console.log(items);
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
