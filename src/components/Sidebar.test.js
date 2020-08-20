import React from 'react';
import ReactDom from 'react-dom';
import Sidebar from './Sidebar';

describe('<Sidebar/> Rendering', () => {
  it('Should render without crashing', () => {
    const div = document.createElement('div');
    ReactDom.render(<Sidebar
      items={[]}
      onRemoveDataRow={null}
      hide={3}
    />, div);
  });
});
