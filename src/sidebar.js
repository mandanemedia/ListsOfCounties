import React, {useState} from 'react'

const Collapsible = ({id, name, depth, props}) => {

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);
    return (<div className="menuListItem" >
                <button key={id} onClick={toggle}  style={{ paddingLeft: depth }} className={ !isOpen ? "plus" : "minus"} >
                    {name}
                </button>
                <div className={ !isOpen ? "collapsed" : ""}>
                    {props.states ? <SidebarItem data={props.states} depth={depth+20} /> : null }
                    {props.cities ? <SidebarItem data={props.cities} depth={depth+20} /> : null }
                </div>
            </div>);
}

const SidebarItem = ({data, depth=0}) => 
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

const Sidebar = ({items}) => 
 {
  return (
    <div  className="sidebar">
        <SidebarItem data={items} depth={0} />
    </div>
  )
}

export default Sidebar