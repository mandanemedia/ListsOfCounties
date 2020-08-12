// @flow
import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { IoIosRemove, IoIosAdd } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';

export type ItemType = {
    name: string,
    id: number,
    states? : Array<ItemType>,
    cities? : Array<ItemType>
};

const Collapsible = ({ props }) => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    id, name, depth, onRemoveDataRow, hide,
  } = props;
  const toggle = () => setIsOpen(!isOpen);
  const hasChild = (props.states && props.states.length > 0)
  || (props.cities && props.cities.length > 0);
  const parrents = props.parrents.length > 0 ? [...props.parrents, ...[id]] : [id];
  const removeDataRow = (newParrents) => {
    onRemoveDataRow(newParrents);
  };
  return (
    <div className={`menuListItem ${(hide > (depth / 20)) ? '' : 'hideDiv'}`}>
      <div className="rowItem">
        <AiFillDelete onClick={() => removeDataRow(parrents)} className="removeRow" />
        <button type="button" style={{ marginLeft: depth }} onClick={toggle} className={`treeButton ${hasChild ? ' hasChild' : ' noChild'}`}>
          {hasChild && (hide - 1 > (depth / 20)) ? isOpen ? <IoIosRemove /> : <IoIosAdd /> : null}
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
                parrents={parrents}
                onRemoveDataRow={onRemoveDataRow}
                hide={hide}
              />
            ) : null }
          {props.cities
            ? (
              <SidebarItem
                data={props.cities}
                depth={depth + 20}
                onRemoveDataRow={onRemoveDataRow}
                parrents={parrents}
                hide={hide}
              />
            ) : null }
        </Collapse>
      )
        : null}
    </div>
  );
};

const SidebarItem = ({
  data, depth = 0, onRemoveDataRow = null, parrents = [], hide = 4,
}:{
  data:Array<ItemType>,
  depth:number,
  onRemoveDataRow:Function,
  parrents: Array<any>,
  hide: number}) => (
    <div className="menuList">
      {
                data.map(({ name, id, ...props }) => {
                  const newprops = {
                    ...props,
                    ...{ id },
                    ...{ name },
                    ...{ parrents },
                    ...{ depth },
                    ...{ onRemoveDataRow },
                    ...{ hide },
                  };
                  return (
                    <Collapsible key={id} props={newprops} />
                  );
                })
            }
    </div>
);

const Sidebar = (
  {
    items, onRemoveDataRow, hide,
  }:
    {items:Array<ItemType>, onRemoveDataRow:Function, hide:number},
) => (
  <div className="sidebar">
    <SidebarItem
      data={items}
      depth={0}
      onRemoveDataRow={onRemoveDataRow}
      parrents={[]}
      hide={hide}
    />
  </div>
);

export default Sidebar;
