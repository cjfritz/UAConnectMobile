import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import News from './News';

describe('<News />', () => {
  it('renders with default props', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<News />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
