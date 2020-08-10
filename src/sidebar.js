// @flow
import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { IoIosRemove, IoIosAdd } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';

type itemType = {
    name: string,
    id: number,
    states? : Array<itemType>,
    cities? : Array<itemType>
};

const Collapsible = (
  {
    id, name, depth, onRemoveDataRow, props,
  },
) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  const hasChild = (props.states && props.states.length > 0)
  || (props.cities && props.cities.length > 0);
  const parrents = props.parrents.length > 0 ? [...props.parrents, ...[id]] : [id];
  const removeDataRow = (newParrents) => {
    onRemoveDataRow(newParrents);
  };
  return (
    <div className="menuListItem">
      <div className="rowItem">
        <AiFillDelete onClick={() => removeDataRow(parrents)} className="removeRow" />
        <button type="button" style={{ marginLeft: depth }} onClick={toggle} className={`treeButton ${hasChild ? ' hasChild' : ' noChild'}`}>
          {hasChild ? isOpen ? <IoIosRemove /> : <IoIosAdd /> : null}
          {name}
        </button>
      </div>
      {hasChild ? (
        <Collapse isOpened={isOpen}>
          {props.states
            ? (
              <SidebarItem
                data={props.states}
                depth={depth + 20}
                onRemoveDataRow={onRemoveDataRow}
                parrents={parrents}
              />
            ) : null }
          {props.cities
            ? (
              <SidebarItem
                data={props.cities}
                depth={depth + 20}
                onRemoveDataRow={onRemoveDataRow}
                parrents={parrents}
              />
            ) : null }
        </Collapse>
      )
        : null}
    </div>
  );
};

const SidebarItem = ({
  data, depth = 0, onRemoveDataRow = null, parrents = [],
}:{data:Array<itemType>, depth:number, onRemoveDataRow:any, parrents: Array<any>}) => (
  <div className="menuList">
    {
                data.map(({ name, id, ...props }) => {
                  const newprops = { ...props, ...{ parrents } };
                  return (
                    <Collapsible
                      key={id}
                      id={id}
                      name={name}
                      depth={depth}
                      onRemoveDataRow={onRemoveDataRow}
                      props={newprops}
                    />
                  );
                })
            }
  </div>
);

const Sidebar = ({ items, onRemoveDataRow }:{items:Array<itemType>, onRemoveDataRow:any}) => (
  <div className="sidebar">
    <SidebarItem data={items} depth={0} onRemoveDataRow={onRemoveDataRow} parrents={[]} />
  </div>
);

export default Sidebar;
