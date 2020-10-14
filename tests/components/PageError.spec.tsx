import React from 'react';
import { shallow } from 'enzyme';
import { PageError } from '../../src/components/PageError';

describe('components/PageError', () => {
  it('should render component properly', () => {
    const fakeCode = '404';
    const fakeDescription = 'bar';
    const fakeMessage = 'foo';
    const wrap = shallow(
      <PageError classes={{}} code={fakeCode} message={fakeMessage} description={fakeDescription} />,
    );
    console.log(wrap.debug());
    expect(wrap.find('h1')).toHaveText(`${fakeCode} ${fakeMessage}`);
    expect(wrap.find('h2')).toHaveText(fakeDescription);
  });
});
