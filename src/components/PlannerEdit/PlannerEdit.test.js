import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { PlannerEdit } from './PlannerEdit';

const props = {
  course: '',
  description: '',
  term: '',
  grade: '',
  units: '',
  coursePlannerUpdate: jest.fn(),
  coursePlannerSave: jest.fn(),
  coursePlannerDelete: jest.fn(),
  navigation: {
    getParam: jest.fn(),
  },
  validFields: {
    validCourse: false,
    validDescription: false,
    validTerm: false,
    validGrade: false,
    validUnits: false,
  },
};

describe('<PlannerEdit />', () => {
  it('can render with empty, invalid props', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerEdit { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render with invalid text for grade and units props', () => {
    const newProps = {
      grade: 'badInput',
      units: 'badInput',
      validFields: {
        validCourse: true,
        validDescription: true,
        validTerm: true,
      },
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerEdit { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render with invalid values greater than max range for grade and units props', () => {
    const newProps = {
      grade: 4.1,
      units: 5,
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerEdit { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render with invalid values less than min range for grade and units props', () => {
    const newProps = {
      grade: -0.5,
      units: -1,
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerEdit { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render with valid values for props', () => {
    const newProps = {
      course: 'testCourse',
      description: 'testDescription',
      term: 'testTerm',
      grade: '',
      units: '',
      validFields: {
        validCourse: true,
        validDescription: true,
        validTerm: true,
        validGrade: true,
        validUnits: true,
      },
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerEdit { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
