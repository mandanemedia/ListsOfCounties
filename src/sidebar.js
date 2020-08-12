// @flow
import React from 'react';
import SidebarItem from './sidebarItem';
import type {ItemType} from './sidebarItem';

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
