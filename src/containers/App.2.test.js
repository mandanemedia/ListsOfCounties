import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import waitForExpect from 'wait-for-expect';
import fetchData from '../apiWrappers/fetchData';
import data from '../data/data.json';
import App from './App';

jest.mock('../apiWrappers/fetchData');

describe('<App/> Rendering using enzyme', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetchData.mockReset();
    fetchData.mockReturnValue(Promise.resolve(data));
  });
  /* test('On loading check Snapshot', async () => {
    await act(async () => {
      const wrapper = mount(<App />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  }); */

  test('On loading', async () => {
    await act(async () => {
      const wrapper = mount(<App />);
      expect(wrapper.find('span').length).toEqual(1);
      expect(wrapper.find('span').at(0).text()).toEqual('Loading List');
    });
  });

  test('After loading with good data', async () => {
    await act(async () => {
      const wrapper = mount(<App />);
      expect(wrapper.text().includes('Loading List')).toBe(true);
      expect(wrapper.text().includes('1st Country')).toBe(false);

      await waitForExpect(() => {
        expect(fetchData).toHaveBeenCalledTimes(1);
      });
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

  test('After loading with error on fetchData', async () => {
    await act(async () => {
      fetchData.mockReset();
      fetchData.mockImplementationOnce(() => Promise.reject(new Error()));
      const wrapper = mount(<App />);

      await waitForExpect(() => {
        expect(fetchData).toHaveBeenCalledTimes(1);
      });
      wrapper.update();

      expect(wrapper.text().includes('Loading List')).toBe(false);
      expect(wrapper.text().includes('No Record')).toBe(true);
    });
  });

  test('Once loaded and change filter', async () => { const wrapper = mount(<App />);
    await act(async () => {
      await waitForExpect(() => {
        expect(fetchData).toHaveBeenCalledTimes(1);
        wrapper.update();
        expect(wrapper.text().includes('1st Country')).toBe(true);
        expect(wrapper.text().includes('1st State')).toBe(true);
        expect(wrapper.text().includes('1st City')).toBe(true);
      });
      wrapper.update();

      wrapper.find('input[type="radio"]').at(0).instance().checked = true;
      wrapper.find('input[type="radio"]').at(0).simulate('change');
      wrapper.update();
      expect(wrapper.find('.hideDiv').at(1).text().includes('1st Country')).toBe(false);
      expect(wrapper.find('.hideDiv').at(1).text().includes('1st State')).toBe(true);
      expect(wrapper.find('.hideDiv').at(1).text().includes('1st City')).toBe(true);

      wrapper.find('input[type="radio"]').at(1).instance().checked = true;
      wrapper.find('input[type="radio"]').at(1).simulate('change');
      wrapper.update();
      expect(wrapper.find('.hideDiv').at(1).text().includes('1st Country')).toBe(false);
      expect(wrapper.find('.hideDiv').at(1).text().includes('1st State')).toBe(false);
      expect(wrapper.find('.hideDiv').at(1).text().includes('1st City')).toBe(true);
    });
  });

  test('Once loaded and test remove nodes', async () => {
    await act(async () => {
      const wrapper = mount(<App />);
      await waitForExpect(() => {
        expect(fetchData).toHaveBeenCalledTimes(1);
      });
      wrapper.update();
      expect(wrapper.text().includes('Loading List')).toBe(false);

      // Remove first City
      wrapper.find('[data-testid="removeDataRow-3"]').at(0).simulate('click');
      expect(wrapper.text().includes('1st Country')).toBe(true);
      expect(wrapper.text().includes('1st State')).toBe(true);
      expect(wrapper.text().includes('1st City')).toBe(false);
      expect(wrapper.text().includes('2nd City')).toBe(true);
      expect(wrapper.text().includes('2nd State')).toBe(true);
      expect(wrapper.text().includes('3rd City')).toBe(true);
      expect(wrapper.text().includes('2nd Country')).toBe(true);

      // Remove first State
      wrapper.find('[data-testid="removeDataRow-2"]').at(0).simulate('click');
      expect(wrapper.text().includes('1st Country')).toBe(true);
      expect(wrapper.text().includes('1st State')).toBe(false);
      expect(wrapper.text().includes('1st City')).toBe(false);
      expect(wrapper.text().includes('2nd City')).toBe(false);
      expect(wrapper.text().includes('2nd State')).toBe(true);
      expect(wrapper.text().includes('3rd City')).toBe(true);
      expect(wrapper.text().includes('2nd Country')).toBe(true);

      // Remove first country
      wrapper.find('[data-testid="removeDataRow-1"]').at(0).simulate('click');
      expect(wrapper.text().includes('1st Country')).toBe(false);
      expect(wrapper.text().includes('1st State')).toBe(false);
      expect(wrapper.text().includes('1st City')).toBe(false);
      expect(wrapper.text().includes('2nd City')).toBe(false);
      expect(wrapper.text().includes('2nd State')).toBe(false);
      expect(wrapper.text().includes('3rd City')).toBe(false);
      expect(wrapper.text().includes('2nd Country')).toBe(true);
    });
  });

  test('Once loaded and search country', async () => { const wrapper = mount(<App />);
    await act(async () => {
      await waitForExpect(() => {
        expect(fetchData).toHaveBeenCalledTimes(1);
      });
      wrapper.update();

      expect(wrapper.text().includes('1st Country')).toBe(true);
      expect(wrapper.text().includes('2nd Country')).toBe(true);

      wrapper.find('input[type="text"]').simulate('change', { target: { value: '1' } });
      wrapper.update();

      expect(wrapper.text().includes('1st Country')).toBe(true);
      expect(wrapper.text().includes('2nd Country')).toBe(false);
      // expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
