import React, { ReactElement } from 'react';

import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import { PRestTableShowItem } from '@postgresrest/node';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const schemaToHeadcell = (schema: PRestTableShowItem) =>
  schema.map((s) => ({
    id: s.column_name,
    label: s.column_name,
    numeric: ['interval', 'integer'].indexOf(s.data_type) > -1,
  })) as HeadCell[];

interface EntityListHeadProps {
  schema: PRestTableShowItem[];
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export const EntityListHead = ({
  onSelectAllClick,
  numSelected,
  rowCount,
  schema,
}: EntityListHeadProps): ReactElement => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
          inputProps={{ 'aria-label': 'select all desserts' }}
        />
      </TableCell>
      {schemaToHeadcell(schema).map((headCell) => (
        <TableCell key={headCell.id} align="center">
          {headCell.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default EntityListHead;
