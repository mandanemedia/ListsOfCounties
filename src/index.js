// @flow
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { MdSettings } from 'react-icons/md';
import Sidebar from './sidebar';

const DataURL = 'https://raw.githubusercontent.com/mandanemedia/ListsOfCounties/master/src/countries%2Bstates%2Bcities.json';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wikiLink, setWikiLink] = useState(false);
  const [setting, setSetting] = useState({ filter: false, hide: '3' });

  useEffect(() => {
    fetch(DataURL)
      .then((res) => res.json())
      .then((newData) => {
        setData(newData);
        setLoading(false);
      });
  }, []);

  const handleRemoveDataRow = (parents:Array<number>) => {
    // remove the country with id === parents[0]
    if (parents.length === 1) {
      let newData = [...data];
      newData = newData.filter(
        item => [parents[0]].indexOf(item.id) === -1,
      );
      setData(newData);
    }
    // remove the state with id === parents[1]
    else if (parents.length === 2) {
      const newData = [...data];
      const countryIndex = newData.findIndex((row) => row.id === parents[0]);
      newData[countryIndex].states = newData[countryIndex].states.filter(
        (item) => [parents[1]].indexOf(item.id) === -1,
      );
      setData(newData);
    } else if (parents.length === 3) {
    // remove the city with id === parents[2]
      const newData = [...data];
      const countryIndex = newData.findIndex((row) => row.id === parents[0]);
      const stateIndex = newData[countryIndex].states.findIndex((row) => row.id === parents[1]);
      newData[countryIndex].states[stateIndex].cities = newData[countryIndex].states[stateIndex]
        .cities.filter(
          (item) => [parents[2]].indexOf(item.id) === -1,
        );
      setData(newData);
    }
  };

  const toggleWikiLink = () => setWikiLink(!wikiLink);
  const displayFilter = () => setSetting({ ...setting, filter: !setting.filter });
  const applyFilter = () => {
    setSetting({ ...setting, filter: false });
  };
  const onChangeFilterValue = (e) => setSetting({ ...setting, hide: e.target.value });
  return (
    <>
      <div className="filteringSection">
        <input type="checkbox" onChange={toggleWikiLink} defaultChecked={wikiLink} className="toggleWiki" />
        Display Wikipedia icons
        <MdSettings className="rightAlign" onClick={displayFilter} />
        <div className={`settingToggle ${!setting.filter ? 'hideDiv' : ' '}`}>
          Hide:
          <br />
          <input type="radio" name="hide" value="1" checked={(setting.hide === '1')} onChange={onChangeFilterValue} />
          State / Province
          <br />
          <input type="radio" name="hide" value="2" checked={(setting.hide === '2')} onChange={onChangeFilterValue} />
          City
          <br />
          <input type="radio" name="hide" value="3" checked={(setting.hide === '3')} onChange={onChangeFilterValue} />
          None
          <br />
          <button type="button" className="applyFilter rightAlign" onClick={applyFilter}> Close </button>
        </div>
      </div>
      {!loading
        ? (
          <Sidebar
            items={data}
            onRemoveDataRow={handleRemoveDataRow}
            wikiLink={wikiLink}
            hide={parseInt(setting.hide, 10)}
          />
        )
        : <span>Loading List</span>}
    </>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
