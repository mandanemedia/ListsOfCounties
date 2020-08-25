import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchData from '../apiWrappers/fetchData';
import data from '../data/data.json';
import App from './App';

jest.mock('../apiWrappers/fetchData');

const getData = Promise.resolve(data);
fetchData.mockReturnValue(getData);

describe('<App/> Rendering using enzyme', () => {
  beforeEach(() => {
    fetchData.mockClear();
  });
  test('On loading with Snapshot', async () => {
    const wrapper = mount(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('On loading', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('span').length).toEqual(1);
    expect(wrapper.find('span').at(0).text()).toEqual('Loading List');
  });

  test('After loading', async () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('span').at(0).text()).toEqual('Loading List');

    const d = await fetchData();
    expect(d).toHaveLength(data.length);

    wrapper.update();
    expect(wrapper.find('span').exists()).toEqual(false);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
