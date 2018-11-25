import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { PlannerForm } from './PlannerForm';
import { mockCourses, terms } from '../../assets/fixtures/FormFixtures';

const termYears = [2000, 2001, 2002];
const props = {
  coures: '',
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
  mockCourses,
  terms,
  termYears,
  updatePlannerForm: jest.fn(),
};

describe('<PlannerForm />', () => {
  it('renders with empty fields', () => {
    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerForm { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('renders with completed fields', () => {
    const newProps = {
      coures: 'testCourse',
      description: 'testDescription',
      term: 'testTerm',
      grade: 4.0,
      units: 4,
      validFields: {
        validCourse: true,
        validDescription: true,
        validTerm: true,
        validGrade: true,
        validUnits: true,
      },
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<PlannerForm { ...props } { ...newProps } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
