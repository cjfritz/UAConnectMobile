import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import QuickLink from './QuickLink';

const props = {
  onPress: jest.fn(),
  children: 'Profile',
  color: 'white',
  iconName: 'ios-person',
};

describe('<QuickLink />', () => {
  it('renders with profile props', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<QuickLink { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('renders with course plannner props', () => {
    const newProps = {
      children: 'Course Planner',
      iconName: 'ios-bookmarks',
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<QuickLink { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('renders with event props', () => {
    const newProps = {
      children: 'Event',
      iconName: 'ios-calendar',
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<QuickLink { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('renders with news props', () => {
    const newProps = {
      children: 'News',
      iconName: 'md-paper',
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<QuickLink { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
