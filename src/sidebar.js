import React from 'react'

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


export default Sidebar