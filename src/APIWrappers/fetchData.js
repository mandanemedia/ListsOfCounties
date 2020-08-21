const DataURL = 'https://raw.githubusercontent.com/mandanemedia/ListsOfCounties/master/src/countries%2Bstates%2Bcities.json';

const fetchData = async () => {
  try {
    const response = await fetch(DataURL);
    const newData = await response.json();
    return newData;
  }
  catch (e) {
    return Promise.reject(new Error('Error in FetchData'));
  }
};

export default fetchData;
