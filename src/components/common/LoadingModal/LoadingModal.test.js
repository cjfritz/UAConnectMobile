import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { LoadingModal } from './LoadingModal';

describe('<LoadingModal />', () => {
  it('cannot render with default props', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<LoadingModal />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('cannot render without visibility', () => {
    const props = {
      visible: false,
      loadingLabel: null,
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<LoadingModal { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render with visibility', () => {
    const props = {
      visible: true,
      loadingLabel: 'This is a test',
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<LoadingModal { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render with visibility and without loadingLabel', () => {
    const props = {
      visible: true,
      loadingLabel: undefined,
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<LoadingModal { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
