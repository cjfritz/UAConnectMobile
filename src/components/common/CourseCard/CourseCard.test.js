import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CourseCard from './CourseCard';



describe('<CourseCard />', () => {
  it('renders with default props', () => {
    const props = {
      courseItem: {},
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<CourseCard { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('renders with defined props', () => {
    const props = {
      courseItem: {
        course: 'TestCourse',
        description: 'TestDescription',
        term: 'TestTerm',
        grade: 4.0,
        units: 4,
      },
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<CourseCard { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('renders with missing grade', () => {
    const props = {
      courseItem: {
        course: 'TestCourse',
        description: 'TestDescription',
        term: 'TestTerm',
        grade: '',
        units: 4,
      },
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<CourseCard { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('renders with missing units', () => {
    const props = {
      courseItem: {
        course: 'TestCourse',
        description: 'TestDescription',
        term: 'TestTerm',
        grade: 4.0,
        units: '',
      },
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<CourseCard { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});

