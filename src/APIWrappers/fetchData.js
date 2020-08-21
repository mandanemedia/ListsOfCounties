const DataURL = 'https://raw.githubusercontent.com/mandanemedia/ListsOfCounties/master/src/countries%2Bstates%2Bcities.json';

const fetchData = async () => {
  const response = await fetch(DataURL);
  const newData = await response.json();
  return newData;
};

export default fetchData;
