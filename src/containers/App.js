// @flow
import React, { useEffect, useState } from 'react';
import FilterSection from '../components/FilterSection';
import Sidebar from '../components/Sidebar';
import fetchData from '../apiWrappers/fetchData';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setting, setSetting] = useState({ hide: '3', loadedData: [] });

  useEffect(() => {
    const getData = async () => {
      try {
        const newData = await fetchData();
        setData(newData);
        setSetting({ ...setting, loadedData: newData });
        setLoading(false);
      }
      catch (e) {
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line
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
      newData[countryIndex] = {
        // cloning the whole content
        ...newData[countryIndex],
        // creating a new states
        states: newData[countryIndex].states.filter(
          (item) => [parents[1]].indexOf(item.id) === -1,
        ),
      };
      // newData[countryIndex].states = newData[countryIndex].states.filter(
      //   (item) => [parents[1]].indexOf(item.id) === -1,
      // );
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

  const onChangeFilterValue = (e) => setSetting({ ...setting, hide: e.target.value });
  const onChangeSearch = (e) => {
    if (!loading) {
      const newData = setting.loadedData.filter(
        (x) => x.name.toLowerCase().includes(e.target.value.toLowerCase()),
      );
      setData(newData);
    }
  };
  return (
    <>
      <FilterSection
        onChangeSearch={onChangeSearch}
        onChangeFilterValue={onChangeFilterValue}
        filterValue={setting.hide}
      />
      {!loading
        ? (
          <Sidebar
            items={data}
            onRemoveDataRow={handleRemoveDataRow}
            hide={parseInt(setting.hide, 10)}
          />
        )
        : <span>Loading List</span>}
    </>
  );
};
export default App;
