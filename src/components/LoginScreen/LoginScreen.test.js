import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LoginScreen } from './LoginScreen';

configure({ adapter: new Adapter() });

describe('<LoginScreen />', () => {
  it('renders correctly initially', () => {
    const renderer = shallow(<LoginScreen />);
    expect(renderer).toMatchSnapshot();
  });

  // it('renders with an email', () => {
  //   const props = {
  //   };
  // });
});
