import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import jsonData from './data.json';
import Sidebar from './sidebar';

const DataURL = 'https://raw.githubusercontent.com/mandanemedia/ListsOfCounties/master/src/countries%2Bstates%2Bcities.json';

const App = ({ items = [] }) => {
  const [data, setData] = useState(items);

  useEffect(() => {
    fetch(DataURL)
      .then((res) => res.json())
      .then((newData) => {
        setData(newData);
      });
  }, []);

  const handleRemoveDataRow = (parents) => {
    // delete country
    if (parents.length === 1) {
      let newData = [...data];
      newData = newData.filter(item => [parents[0]].indexOf(item.id) === -1);
      setData(newData);
    }
    // delete state
    else if (parents.length === 2) {
      const newData = [...data];
      const countryIndex = newData.findIndex((row) => row.id === parents[0]);
      newData[countryIndex].states = newData[countryIndex].states.filter(
        (item) => [parents[1]].indexOf(item.id) === -1,
      );
      setData(newData);
    } else if (parents.length === 3) {
    // delete city
      const newData = [...data];
      const countryIndex = newData.findIndex((row) => row.id === parents[0]);
      const stateIndex = newData[countryIndex].states.findIndex((row) => row.id === parents[1]);
      newData[countryIndex].states[stateIndex].cities = newData[countryIndex]
        .states[stateIndex].cities.filter((item) => [parents[2]].indexOf(item.id) === -1);
      setData(newData);
    }
  };

  return (
    <>
      {(data.length > 0)
        ? <Sidebar items={data} onRemoveDataRow={handleRemoveDataRow} />
        : <span>Loading</span>}
    </>
  );
};

ReactDOM.render(
  <App items={jsonData} />,
  document.getElementById('root'),
);
