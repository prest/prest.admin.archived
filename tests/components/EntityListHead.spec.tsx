import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { shallow } from 'enzyme';

import EntityListHead from '~/components/EntityList/EntityListHead';

describe('src/components/EntityList/EntityListHead', () => {
  const count = 5;
  const fakeSchema = [
    {
      column_name: 'foo',
      data_type: 'string',
    },
    {
      column_name: 'bar',
      data_type: 'string',
    },
  ];

  const expectCells = (wrap) => {
    const cells = wrap.find(TableCell);

    fakeSchema.forEach(({ column_name }, idx) => {
      const cell = cells.at(idx + 1);
      expect(cell).toHaveProp('align', 'center');
      expect(cell).toHaveText(column_name);
    });
  };

  const expectCheckbox = (wrap, indeterminate = false, checked = false) => {
    const check = wrap.find(Checkbox);
    expect(check).toHaveProp('indeterminate', indeterminate);
    expect(check).toHaveProp('checked', checked);
    expect(check).toHaveProp('inputProps', { 'aria-label': 'select all desserts' });
  };

  const shallowEntityListHead = (rowCount, numSelected = 0) => {
    const wrap = shallow(<EntityListHead numSelected={numSelected} schema={fakeSchema} rowCount={rowCount} />);
    expect(wrap).toContainMatchingElement(TableHead);
    expect(wrap).toContainMatchingElement(TableRow);

    return wrap;
  };
  it('should render header with rowCount == 0', () => {
    const wrap = shallowEntityListHead(count);
    expectCheckbox(wrap);
    expectCells(wrap);
  });

  it('should should render header with rowCount > 0 and != numSelected', () => {
    const wrap = shallowEntityListHead(count, 2);
    expectCheckbox(wrap, true);
    expectCells(wrap);
  });

  it('should should render header with rowCount > 0 and == numSelected', () => {
    const wrap = shallowEntityListHead(count, count);
    expectCheckbox(wrap, false, true);
    expectCells(wrap);
  });
});
