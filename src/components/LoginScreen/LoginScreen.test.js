import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { LoginScreen } from './LoginScreen';

describe('<LoginScreen />', () => {
  it('renders with default props', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<LoginScreen />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('renders with complete email and password fields', () => {
    const props = {
      email: 'test@test.com',
      password: 'password',
      onEmailChange: jest.fn(),
      onPasswordChange: jest.fn(),
      loading: false,
      onLoginUser: jest.fn(),
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<LoginScreen { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
