import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import renderer from 'react-test-renderer';
import fetchData from '../apiWrappers/fetchData';
import data from '../data/data.json';
import App from './App';

jest.mock('../apiWrappers/fetchData');

const getData = Promise.resolve(data);
fetchData.mockReturnValue(getData);

describe('<App/> Rendering using react-test-renderer and testing-library/react-hooks', () => {
  beforeEach(() => {
    fetchData.mockClear();
  });

  test('On loading using Snapshot', () => {
    const component = renderer.create(<App />);
    const app = component.toJSON();
    expect(app).toMatchSnapshot();
  });

  test('After loading using Snapshot', async () => {
    const { waitForNextUpdate } = renderHook(() => App());
    const component = renderer.create(<App />);

    await waitForNextUpdate();

    const app = component.toJSON();
    expect(app).toMatchSnapshot();
  });
});
