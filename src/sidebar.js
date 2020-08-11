// @flow
import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { IoIosRemove, IoIosAdd } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';
import { FcWikipedia } from 'react-icons/fc';

export type ItemType = {
    name: string,
    id: number,
    states? : Array<ItemType>,
    cities? : Array<ItemType>
};

const Collapsible = ({ props }) => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    id, name, depth, wikiLink, onRemoveDataRow,
  } = props;
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
        {wikiLink ? <FcWikipedia className="wikiICon" /> : null}
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
                wikiLink={wikiLink}
              />
            ) : null }
          {props.cities
            ? (
              <SidebarItem
                data={props.cities}
                depth={depth + 20}
                onRemoveDataRow={onRemoveDataRow}
                parrents={parrents}
                wikiLink={wikiLink}
              />
            ) : null }
        </Collapse>
      )
        : null}
    </div>
  );
};

const SidebarItem = ({
  data, depth = 0, onRemoveDataRow = null, parrents = [], wikiLink = false,
}:{
  data:Array<ItemType>,
  depth:number,
  onRemoveDataRow:Function,
  parrents: Array<any>,
  wikiLink:bool}) => (
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
                    ...{ wikiLink },
                  };
                  return (
                    <Collapsible key={id} props={newprops} />
                  );
                })
            }
    </div>
);

const Sidebar = (
  { items, onRemoveDataRow, wikiLink }:
    {items:Array<ItemType>, onRemoveDataRow:Function, wikiLink:bool},
) => (
  <div className="sidebar">
    <SidebarItem
      data={items}
      depth={0}
      onRemoveDataRow={onRemoveDataRow}
      parrents={[]}
      wikiLink={wikiLink}
    />
  </div>
);

export default Sidebar;
