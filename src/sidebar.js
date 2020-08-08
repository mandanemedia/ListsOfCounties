// @flow
import React, {useState} from 'react'
import {Collapse} from 'react-collapse';
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";

type itemType = {
    name: string,
    id: number,
    states? : Array<itemType>,
    cities? : Array<itemType>
}

const Collapsible = ({id, name, depth, props}) => {

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);
    const hasChild = (props.states && props.states.length>0) || ( props.cities && props.cities.length>0);
    return (<div className="menuListItem" >
                <div className="rowItem"> 
                    {hasChild ? <AiFillDelete className="deleteRow"/> : null}
                    <button key={id}  style={{ marginLeft: depth}} onClick={toggle} className={`treeButton ${hasChild ? " hasChild": " noChild" }`} >
                        {hasChild ? isOpen ? <IoIosRemove /> : <IoIosAdd /> : null}
                        {name}
                    </button>
                </div>
                {hasChild ?  
                <Collapse isOpened={isOpen}>
                    {props.states ? <SidebarItem data={props.states} depth={depth+20} /> : null }
                    {props.cities ? <SidebarItem data={props.cities} depth={depth+20} /> : null }
                </Collapse> 
                :null}
            </div>);
}

const SidebarItem = ({data, depth=0}:{data:Array<itemType>, depth:number}) => 
{
    return (
        <div className="menuList">
            {
                data.map( ({name, id, ...props}) => {
                    return (<Collapsible id={id} name={name} depth={depth} props={props}/>)
                })
            }
        </div>
    )
}

const Sidebar = ({items}:{items:Array<itemType>}) => 
 {
  return (
    <div  className="sidebar">
        <SidebarItem data={items} depth={0} />
    </div>
  )
}

export default Sidebar