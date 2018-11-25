import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { HomeScreen } from './HomeScreen';

describe('<Homescreen />', () => {
  it('renders with default props', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<HomeScreen navigation={ null } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
