import React, { useState} from 'react';
import { MdSettings } from 'react-icons/md';

const FilterSection = ({
  onChangeSearch, onChangeFilterValue, filterValue,
}) => {
  const [filter, setFilter] = useState(false);
  const displayFilter = () => setFilter(true);
  const hideFilter = () => setFilter(false);

  return (
    <div className="filterSection">
      <input type="text" name="search" className="searchBox" placeholder="Country Search" onChange={onChangeSearch} />
      <MdSettings className="rightAlign" onClick={displayFilter} />
      <div className={`settingToggle ${!filter ? 'hideDiv' : ' '}`}>
        Hide:
        <br />
        <input type="radio" name="hide" value="1" checked={(filterValue === '1')} onChange={onChangeFilterValue} />
        State / Province
        <br />
        <input type="radio" name="hide" value="2" checked={(filterValue === '2')} onChange={onChangeFilterValue} />
        City
        <br />
        <input type="radio" name="hide" value="3" checked={(filterValue === '3')} onChange={onChangeFilterValue} />
        None
        <br />
        <button type="button" className="applyFilter rightAlign" onClick={hideFilter}> Close </button>
      </div>
    </div>
  );
};
export default FilterSection;
