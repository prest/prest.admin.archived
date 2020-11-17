import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { shallow } from 'enzyme';

import { EntityListToolbar } from '~/components/EntityList/EntityListToolbar';

describe('src/components/EntityList/EntityListToolbar', () => {
  const fakeEntity = 'foobar';
  const fakeClasses = { root: 'root', highlight: 'highlight' };

  it('should render component with non selected', () => {
    const wrap = shallow(<EntityListToolbar numSelected={0} entity={fakeEntity} classes={fakeClasses} />);

    expect(wrap).toContainMatchingElement(Toolbar);
    expect(wrap).toHaveClassName(fakeClasses.root);
    expect(wrap).toContainMatchingElement(Typography);
    expect(wrap.find(Typography)).toHaveProp('variant', 'h6');
    expect(wrap.find(Typography)).toHaveProp('id', 'tableTitle');
    expect(wrap.find(Typography)).toHaveProp('component', 'div');
    expect(wrap.find(Typography)).toHaveText(fakeEntity);
  });

  it('should render component with selected values', () => {
    const numSelected = 2;
    const wrap = shallow(<EntityListToolbar numSelected={numSelected} entity={fakeEntity} classes={fakeClasses} />);

    expect(wrap).toContainMatchingElement(Toolbar);
    expect(wrap).toHaveClassName(`${fakeClasses.root} ${fakeClasses.highlight}`);
    expect(wrap).toContainMatchingElement(Typography);
    expect(wrap.find(Typography)).toHaveProp('variant', 'subtitle1');
    expect(wrap.find(Typography)).toHaveProp('color', 'inherit');
    expect(wrap.find(Typography)).toHaveProp('component', 'div');
    expect(wrap.find(Typography)).toHaveText(`${numSelected} selected`);
    expect(wrap).toContainMatchingElement(Tooltip);
  });
});
