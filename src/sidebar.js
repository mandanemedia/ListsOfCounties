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

const Collapsible = ({id, name, depth, onRemoveDataRow, props}) => {

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);
    const hasChild = (props.states && props.states.length>0) || ( props.cities && props.cities.length>0);
    const removeDataRow = (id) => {
        onRemoveDataRow(id);
    };
    return (<div className="menuListItem" >
                <div className="rowItem"> 
                    {props.states ? <AiFillDelete onClick={()=>removeDataRow(id)} className="removeRow" /> : null }
                    <button style={{ marginLeft: depth}} onClick={toggle} className={`treeButton ${hasChild ? " hasChild": " noChild" }`} >
                        {hasChild ? isOpen ? <IoIosRemove /> : <IoIosAdd /> : null}
                        {name}
                    </button>
                </div>
                {hasChild ?  
                <Collapse isOpened={isOpen}>
                    {props.states ? <SidebarItem data={props.states} depth={depth+20} onRemoveDataRow={onRemoveDataRow}/> : null }
                    {props.cities ? <SidebarItem data={props.cities} depth={depth+20} onRemoveDataRow={onRemoveDataRow} /> : null }
                </Collapse> 
                :null}
            </div>);
}

const SidebarItem = ({data, depth=0, onRemoveDataRow=null}:{data:Array<itemType>, depth:number, onRemoveDataRow:any}) => 
{
    return (
        <div className="menuList">
            {
                data.map( ({name, id, ...props}) => {
                    return (<Collapsible key={id} id={id} name={name} depth={depth} onRemoveDataRow={onRemoveDataRow} props={props}/>)
                })
            }
        </div>
    )
}

const Sidebar = ({items, onRemoveDataRow}:{items:Array<itemType>, onRemoveDataRow:any}) => 
 {
  return (
    <div  className="sidebar">
        <SidebarItem data={items} depth={0} onRemoveDataRow={onRemoveDataRow} />
    </div>
  )
}

export default Sidebar