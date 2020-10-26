jest.mock('react', () => {
  const mock = jest.requireActual('react');
  return { ...mock, useState: jest.fn() };
});

import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

import { shallow } from 'enzyme';

import { EntityList, createHandleClick, createHandleSelectAllClick } from '~/components/EntityList';
import EntityListToolbar from '~/components/EntityList/EntityListToolbar';
import EntityListHead from '~/components/EntityList/EntityListHead';

describe('src/components/EntityList', () => {
  const fakeData1 = { id: 1, foo: 'fizz', bar: 'fuzz' };
  const fakeData2 = { id: 2, foo: 'foobar', bar: 'fizzfuzz' };
  const fakeRows = [fakeData1, fakeData2];
  const fakeSet = jest.fn();
  const fakeId1 = '1';
  const fakeId2 = '2';
  const fakeId3 = '3';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('createHandleClick', () => {
    it('should add new value that not exists on selected', () => {
      createHandleClick([], fakeSet)(fakeId1)();
      expect(fakeSet).toHaveBeenCalledWith([fakeId1]);
    });

    it('should add new value when exist one value in list', () => {
      createHandleClick([fakeId1], fakeSet)(fakeId2)();
      expect(fakeSet).toHaveBeenCalledWith([fakeId1, fakeId2]);
    });

    it('should remove a value that already exists on a list with one value', () => {
      createHandleClick([fakeId1, fakeId2, fakeId3], fakeSet)(fakeId2)();
      expect(fakeSet).toHaveBeenCalledWith([fakeId1, fakeId3]);
    });

    it('should remove the first value on a list with multiple values', () => {
      createHandleClick([fakeId1, fakeId2], fakeSet)(fakeId1)();
      expect(fakeSet).toHaveBeenCalledWith([fakeId2]);
    });

    it('should remove a last value on a list with multiple values', () => {
      createHandleClick([fakeId1, fakeId2], fakeSet)(fakeId2)();
      expect(fakeSet).toHaveBeenCalledWith([fakeId1]);
    });
  });

  describe('createHandleSelectAllClick', () => {
    const handle = createHandleSelectAllClick(fakeRows, fakeSet);
    const ids = fakeRows.map((n) => n.id);
    it('should select all values', () => {
      const fakeEvent = { target: { checked: true } };
      handle(fakeEvent);
      expect(fakeSet).toHaveBeenCalledWith(ids);
    });

    it('should umnselect all values', () => {
      const fakeEvent = { target: { checked: false } };
      handle(fakeEvent);
      expect(fakeSet).toHaveBeenCalledWith([]);
    });
  });

  describe('Component', () => {
    const fakeSet = jest.fn();
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

    const expectCell = (cell, text) => {
      expect(cell).toHaveProp('component', 'th');
      expect(cell).toHaveProp('scope', 'row');
      expect(cell).toHaveProp('padding', 'none');
      expect(cell).toHaveProp('align', 'center');
      expect(cell).toHaveText(text);
    };

    const coreTableExpect = (wrap, rows = fakeRows, select = []) => {
      expect(wrap).toContainMatchingElement(Paper);
      expect(wrap).toContainMatchingElement(TableBody);
      expect(wrap.find(EntityListToolbar)).toHaveProp('entity', 'alo');
      expect(wrap.find(EntityListToolbar)).toHaveProp('numSelected', select.length);
      expect(wrap.find(EntityListHead)).toHaveProp('numSelected', select.length);
      expect(wrap.find(EntityListHead)).toHaveProp('schema', fakeSchema);
      expect(wrap.find(EntityListHead)).toHaveProp('rowCount', rows.length);
      expect(wrap.find(TableRow)).toHaveLength(rows.length);
    };

    it('should render with empty list', () => {
      (useState as jest.Mock).mockReturnValue([[], fakeSet]);

      const rows = [];
      const wrap = shallow(<EntityList rows={rows} schema={fakeSchema} entity="alo" />);

      coreTableExpect(wrap, rows);
    });

    it('should render with items', () => {
      (useState as jest.Mock).mockReturnValue([[], fakeSet]);
      const wrap = shallow(<EntityList rows={fakeRows} schema={fakeSchema} entity="alo" />);
      const rowsWrap = wrap.find(TableRow);

      coreTableExpect(wrap);

      fakeRows.forEach(({ foo, bar }, idx) => {
        const row = rowsWrap.at(idx);

        const cells = row.find(TableCell);
        expect(row).toHaveProp('hover');
        expect(row).toHaveProp('role', 'checkbox');
        expect(row).toHaveProp('aria-checked', false);
        expect(row).toHaveProp('selected', false);
        expect(row).toHaveProp('tabIndex', -1);

        expect(cells.at(0)).toContainMatchingElement(Checkbox);
        expectCell(cells.at(1), foo);
        expectCell(cells.at(2), bar);
      });
    });

    it('shoudl render with item and selected value', () => {
      const selected = [fakeData1.id];
      (useState as jest.Mock).mockReturnValue([selected, fakeSet]);
      const wrap = shallow(<EntityList rows={fakeRows} schema={fakeSchema} entity="alo" />);
      const rowsWrap = wrap.find(TableRow);

      coreTableExpect(wrap, fakeRows, selected);

      fakeRows.forEach(({ id, foo, bar }, idx) => {
        const row = rowsWrap.at(idx);
        const cells = row.find(TableCell);
        const isSelect = selected.indexOf(id) !== -1;

        expect(row).toHaveProp('hover');
        expect(row).toHaveProp('role', 'checkbox');
        expect(row).toHaveProp('aria-checked', isSelect);
        expect(row).toHaveProp('selected', isSelect);
        expect(row).toHaveProp('tabIndex', -1);

        expect(cells.at(0)).toContainMatchingElement(Checkbox);
        expectCell(cells.at(1), foo);
        expectCell(cells.at(2), bar);
      });
    });
  });
});
