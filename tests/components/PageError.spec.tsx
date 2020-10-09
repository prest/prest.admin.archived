import React from 'react';
import { shallow } from 'enzyme';
import PageError from '../../src/components/PageError';

describe('components/PageError', () => {
  it('should render component properly', () => {
    const fakeCode = '404';
    const fakeDescription = 'bar';
    const fakeMessage = 'foo';
    const wrap = shallow(<PageError code={fakeCode} message={fakeMessage} description={fakeDescription} />);

    expect(wrap).toHaveProp('code', fakeCode);
    expect(wrap).toHaveProp('message', fakeMessage);
    expect(wrap).toHaveProp('description', fakeDescription);
    expect(wrap).toBeCalled;
  });
});
