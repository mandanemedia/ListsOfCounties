import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FilterSection from './FilterSection';

configure({ adapter: new Adapter() });
describe('<FilterSection/> Rendering', () => {
  test('Render it by react-test-renderer', () => {
    const component = renderer.create(<FilterSection
      onChangeSearch={null}
      onChangeFilterValue={null}
      filterValue={3}
    />);
    const filterSection = component.toJSON();
    expect(filterSection).toMatchSnapshot();
  });
  test('renders it by enzyme', () => {
    const onChangeSearch = jest.fn();
    const onChangeFilterValue = jest.fn();
    const component = mount(<FilterSection
      onChangeSearch={onChangeSearch}
      onChangeFilterValue={onChangeFilterValue}
      filterValue={3}
    />);

    expect(component.find('input[type="text"]').length).toEqual(1);
    expect(component.find('svg').length).toEqual(1);
    expect(component.find('input[type="radio"]').length).toEqual(3);
    expect(component.find('.hideDiv').exists()).toEqual(true);
    expect(component.find('button').length).toEqual(1);

    // Display filter
    component.find('svg').simulate('click');
    expect(component.find('.hideDiv').exists()).toEqual(false);

    // Change the radiobox filter
    component.find('input[type="radio"]').at(0).simulate('change', { target: { checked: true } });
    expect(onChangeFilterValue).toBeCalled();

    // Hide filter
    component.find('button').simulate('click');
    expect(component.find('.hideDiv').exists()).toEqual(true);

    // Change the radiobox filter
    component.find('input[type="text"]').simulate('change', { target: { value: 'C' } });
    expect(onChangeSearch).toBeCalled();
  });
});
