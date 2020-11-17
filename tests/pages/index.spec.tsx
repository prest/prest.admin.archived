jest.mock('../../src/client/nextApi');

import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import { shallow } from 'enzyme';

import PRestHome from '~/pages';
import cli from '~/client/nextApi';

describe('pages/index.tsx', () => {
  describe('render', () => {
    it('should render index page without tables', () => {
      const wrap = shallow(<PRestHome tables={[]} />);
      expect(wrap).toContainMatchingElement(List);
    });

    it('should render index page with tables', () => {
      const fakeTables = ['foo', 'bar'];
      const wrap = shallow(<PRestHome tables={fakeTables.map((name) => ({ name }))} />);

      expect(wrap).toContainMatchingElement(List);
      expect(wrap.find(Link)).toHaveLength(fakeTables.length);

      fakeTables.forEach((name, idx) => {
        const link = wrap.find(Link).at(idx);
        const listItem = link.find(ListItem);
        const itemText = listItem.find(ListItemText);

        expect(link).toHaveProp('href', `/${name}`);
        expect(listItem).toHaveProp('button');
        expect(listItem).toHaveProp('component', 'a');
        expect(itemText).toHaveProp('primary', name);
      });
    });
  });

  describe('getInitialProps', () => {
    it('should back mocked table value', async () => {
      const tables = [{ name: 'films' }];
      (cli.databases as jest.Mock).mockResolvedValue(tables);

      const resp = await PRestHome.getInitialProps();
      expect(resp).toEqual({ tables });
    });
  });
});
