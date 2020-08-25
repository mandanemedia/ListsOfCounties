import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchData from '../apiWrappers/fetchData';
import data from '../data/data.json';
import App from './App';

jest.mock('../apiWrappers/fetchData');
fetchData.mockReturnValue(Promise.resolve(data));

describe('<App/> Rendering using enzyme', () => {
  beforeEach(() => {
    fetchData.mockClear();
  });
  test.skip('On loading check Snapshot', async () => {
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
    expect(wrapper.text().includes('Loading List')).toBe(true);
    expect(wrapper.text().includes('1st Country')).toBe(false);

    const d = await fetchData();
    expect(d).toHaveLength(data.length);

    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text().includes('Loading List')).toBe(false);
    expect(wrapper.text().includes('1st Country')).toBe(true);
    expect(wrapper.find('button').at(1).text()).toBe('1st Country');
    expect(wrapper.find('button').at(2).text()).toBe('1st State');
    expect(wrapper.find('button').at(3).text()).toBe('1st City');
    expect(wrapper.find('button').at(4).text()).toBe('2nd City');
    expect(wrapper.find('button').at(5).text()).toBe('2nd State');
    expect(wrapper.find('button').at(6).text()).toBe('3rd City');
    expect(wrapper.find('button').at(7).text()).toBe('2nd Country');
  });
});
