import React from 'react';
import { shallow } from 'enzyme';
import BackgroundParticles from './../../src/components/BackgroundParticles';
import Particles from 'react-particles-js';

describe('components/BackgroundParticles', () => {
  it('should render component properly', () => {
    const wrap = shallow(<BackgroundParticles />);

    expect(wrap.find(Particles)).toMatchSnapshot();
  });
});
