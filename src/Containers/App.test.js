import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('<App/> Rendering', () => {
  it('Should render without crashing', () => {
    const component = renderer.create(<App />);
    const app = component.toJSON();
    expect(app).toMatchSnapshot();
  });
});
