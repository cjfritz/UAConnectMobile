import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FormPicker from './FormPicker';

describe('<FormPicker />', () => {
  it('can render with initial state', () => {
    const props = {
      placeholder: 'testPlaceholder',
      // selectedValue: jest.fn().mockImplementation(() => 'value'),
      // selectedValue: jest.fn(() => 'item1'),
      selectedValue: jest.fn(),
      onValueChange: jest.fn(),
      items: [
        'item1',
        'item2',
        'item3',
      ],
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<FormPicker { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });

  it('can render selected value', () => {
    const items = ['item1', 'item2', 'item3'];
    const props = {
      placeholder: 'testPlaceholder',
      // selectedValue: jest.fn().mockImplementation(() => 'value'),
      // selectedValue: jest.fn(() => 'item1'),
      selectedValue: jest.fn(() => items[0]),
      onValueChange: jest.fn(),
      items,
    };

    const shallowRenderer = new ShallowRenderer();
    shallowRenderer.render(<FormPicker { ...props } />);
    expect(shallowRenderer.getRenderOutput()).toMatchSnapshot();
  });
});
