import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ProfileScreen } from './ProfileScreen';

const props = {
  loading: false,
  name: '',
  address: '',
  phone: '',
  standing: '',
  expectedGradution: '',
  updateProfile: jest.fn(),
  saveProfile: jest.fn(),
  fetchProfile: jest.fn(),
};

describe('<ProfileScreen />', () => {
  it('should render with empty fields', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<ProfileScreen { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('should render with complete fields', () => {
    const newProps = {
      name: 'someName',
      address: 'someAddress',
      phone: 'somePhone',
      standing: 'someStanding',
      expectedGraduation: 'someGraduation',
    };
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<ProfileScreen { ...props } />);
    shallowRenderer.render(<ProfileScreen { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
    expect(props.fetchProfile).toHaveBeenCalled();
  });
});
