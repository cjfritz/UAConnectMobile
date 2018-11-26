import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { HomeScreen } from './HomeScreen';

const props = {
  loading: false,
  userLoggedOut: jest.fn(),
};

describe('<Homescreen />', () => {
  it('renders with default props', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<HomeScreen { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
