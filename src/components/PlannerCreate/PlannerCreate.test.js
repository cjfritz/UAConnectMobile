import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { PlannerCreate } from './PlannerCreate';

const props = {
  course: '',
  description: '',
  term: '',
  grade: '',
  units: '',
  validFields: {
    validCourse: false,
    validDescription: false,
    validTerm: false,
    validGrade: false,
    validUnits: false,
  },
  coursePlannerCreate: jest.fn(),
  clearForm: jest.fn(),
  updateValidFields: jest.fn(),
};

describe('<PlannerCreate />', () => {
  it('can render with empty, invalid props', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerCreate { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render with invalid text for grade and units props', () => {
    const newProps = {
      course: 'testCoures',
      description: 'testDesc',
      term: 'testTerm',
      grade: 'badInput',
      units: 'badInput',
      validFields: {
        validCourse: true,
        validDescription: true,
        validTerm: true,
        validGrade: false,
        validUnits: false,
      },
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerCreate { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render with invalid values greater than max range for grade and units props', () => {
    const newProps = {
      grade: 4.1,
      units: 5,
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerCreate { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render with invalid values less than min range for grade and units props', () => {
    const newProps = {
      grade: -0.5,
      units: -1,
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerCreate { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
