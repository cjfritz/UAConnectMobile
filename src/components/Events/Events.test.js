import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Events from './Events';

describe('<Events />', () => {
  it('renders with default props', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<Events />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
