import React from 'react';
import { shallow } from 'enzyme';
import PageError from '../../src/components/PageError';

describe('components/PageError', () => {
  it('should render component properly', () => {
    const wrap = shallow(<PageError code="foo" message="bar" description="test" />);

    expect(wrap).toBeCalled;
  });
});
