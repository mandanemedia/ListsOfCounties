// @flow
import React from 'react';
import Collapsible from './collapsible';

export type ItemType = {
    name: string,
    id: number,
    states? : Array<ItemType>,
    cities? : Array<ItemType>
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

export default SidebarItem;