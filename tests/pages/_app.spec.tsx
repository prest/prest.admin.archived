import React from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { shallow } from 'enzyme';

import PRestApp from '~/pages/_app';

describe('pages/_app', () => {
  const FakeComponent = () => <div>fake</div>;
  const fakeProps = { foo: 'bar' };

  it('should render correctly items on app', () => {
    const wrap = shallow(<PRestApp Component={FakeComponent} pageProps={fakeProps} />);
    expect(wrap).toContainMatchingElement(Head);
    expect(wrap).toContainMatchingElement(CssBaseline);
    expect(wrap).toContainMatchingElement(ThemeProvider);
    expect(wrap).toContainMatchingElement(FakeComponent);
    expect(wrap.find(FakeComponent)).toHaveProp('foo', fakeProps.foo);
    expect(wrap.find('link')).toHaveLength(14);
  });
});
