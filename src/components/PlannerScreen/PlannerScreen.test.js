import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { PlannerScreen } from './PlannerScreen';

describe('<PlannerScreen />', () => {
  it('can render reload components on lost connection', () => {
    const props = {
      planner: [],
      loading: false,
      firebasePlannerFetch: jest.fn(),
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerScreen { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render list of course cards', () => {
    const props = {
      planner: [
        {
          course: 'testCourse',
          description: 'testDescription',
          grade: 4.0,
          term: 'testTerm',
          units: 4,
          uid: 'someUid',
        },
      ],
      loading: false,
      firebasePlannerFetch: jest.fn(),
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerScreen { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
