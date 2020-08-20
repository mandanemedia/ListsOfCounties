import React from 'react';
import renderer from 'react-test-renderer';
import Sidebar from './Sidebar';

describe('<Sidebar/> Rendering', () => {
  test('Render an empty sidebar', () => {
    const component = renderer.create(<Sidebar
      items={[]}
      onRemoveDataRow={null}
      hide={3}
    />);
    const sidebar = component.toJSON();

    expect(sidebar.props.className).toEqual('sidebar');
    expect(sidebar.children).toHaveLength(1);

    const sidebarItem = sidebar.children[0];
    expect(sidebarItem.props.className).toEqual('sidebarItem');
    expect(sidebarItem.children).toHaveLength(1);

    const collapsible = sidebarItem.children[0];
    expect(collapsible.props.className.trim()).toEqual('collapsible');
    expect(collapsible.children).toHaveLength(1);

    const rowItem = collapsible.children[0];
    expect(rowItem.props.className).toEqual('rowItem');
    expect(rowItem.children).toHaveLength(1);

    const button = rowItem.children[0];
    expect(button.props.className).toEqual(expect.stringContaining('treeButton'));
    expect(button.children).toHaveLength(1);

    const label = button.children[0];
    expect(label).toEqual('No Record');
  });
});
