import React from 'react';
import { shallow } from 'enzyme';
import BackgroundParticles from './../../src/components/BackgroundParticles';

describe('components/BackgroundParticles', () => {
  it('should render component properly', () => {
    const wrap = shallow(<BackgroundParticles />);

    expect(wrap).toBeCalled;
  });
});
