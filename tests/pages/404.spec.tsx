import React from 'react';

import { shallow } from 'enzyme';

import PageNotFound from '../../src/pages/404';
import PageError from '../../src/components/PageError';
import BackgroundParticles from './../../src/components/BackgroundParticles';

describe('pages/404', () => {
  it('should render correctly items on 404 page', () => {
    const wrap = shallow(<PageNotFound />);
    expect(wrap).toContainMatchingElement(PageError);
    expect(wrap).toContainMatchingElement(BackgroundParticles);
  });
});
