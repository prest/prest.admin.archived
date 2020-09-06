import React from 'react';
import Document, { Html, Main, NextScript } from 'next/document';
import { shallow } from 'enzyme';

import PRestDocument from '~/pages/_document';

describe('pages/_app', () => {
  describe('render', () => {
    it('should render correctly items on app', () => {
      const wrap = shallow(<PRestDocument />);
      expect(wrap).toContainMatchingElement(Html);
      expect(wrap).toContainMatchingElement(Main);
      expect(wrap).toContainMatchingElement(NextScript);
      expect(wrap.find(Html)).toHaveProp('lang', 'en');
    });
  });

  describe('getInitialProps', () => {
    it('should resolve initial props correctly', async () => {
      const fakeProps = { foo: 'bar', styles: [] };
      const fakeRender = jest.fn();
      Document.getInitialProps = jest.fn().mockResolvedValue(fakeProps);

      const r = await PRestDocument.getInitialProps({ renderPage: fakeRender });
      expect(r).toHaveProperty('foo', fakeProps.foo);
      expect(r).toHaveProperty('styles');
    });
  });
});
