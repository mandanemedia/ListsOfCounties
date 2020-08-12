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
    id, name, depth, wikiLink, onRemoveDataRow, hide,
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
                wikiLink={wikiLink}
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
  data, depth = 0, onRemoveDataRow = null, parrents = [], wikiLink = false, hide = 4,
}:{
  data:Array<ItemType>,
  depth:number,
  onRemoveDataRow:Function,
  parrents: Array<any>,
  wikiLink:bool,
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
                    ...{ wikiLink },
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
    items, onRemoveDataRow, wikiLink, hide,
  }:
    {items:Array<ItemType>, onRemoveDataRow:Function, wikiLink:bool, hide:number},
) => (
  <div className="sidebar">
    <SidebarItem
      data={items}
      depth={0}
      onRemoveDataRow={onRemoveDataRow}
      parrents={[]}
      wikiLink={wikiLink}
      hide={hide}
    />
  </div>
);

export default Sidebar;
