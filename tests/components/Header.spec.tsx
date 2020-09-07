import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { shallow } from 'enzyme';

import Header from '~/components/Header';

describe('components/Header', () => {
  it('should render component properly', () => {
    const wrap = shallow(<Header />);

    expect(wrap).toContainMatchingElement(AppBar);
    expect(wrap).toContainMatchingElement(Toolbar);
  });
});
