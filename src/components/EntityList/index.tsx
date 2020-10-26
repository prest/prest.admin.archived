import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import { PRestTableShowItem } from '@postgresrest/node';

import EntityListToolbar from './EntityListToolbar';
import EntityListHead from './EntityListHead';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

type EntityListProps = {
  rows: AnyObject[];
  schema: PRestTableShowItem[];
  entity: string;
};

type SetSelectionFnType = (x: string[]) => void;
export const createHandleClick = (selected: string[], setSelected: SetSelectionFnType) => (
  name: string,
) => (): void => {
  const selectedIndex = selected.indexOf(name);
  let newSelected: string[] = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  }

  setSelected(newSelected);
};

export const createHandleSelectAllClick = (rows: AnyObject[], setSelected: SetSelectionFnType) => (
  event: React.ChangeEvent<HTMLInputElement>,
): void => {
  if (event.target.checked) {
    const newSelecteds = rows.map((n) => n.id);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

export const EntityList = ({ rows, schema, entity }: EntityListProps): React.ReactElement => {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectAllClick = createHandleSelectAllClick(rows, setSelected);
  const handleClick = createHandleClick(selected, setSelected);
  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EntityListToolbar entity={entity} numSelected={selected.length} />
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" aria-label="enhanced table">
            <EntityListHead
              numSelected={selected.length}
              schema={schema}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row['id']);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={handleClick(row['id'])}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                    </TableCell>
                    <>
                      {schema.map((s) => (
                        <TableCell
                          component="th"
                          key={`${row.id}-${s.column_name}`}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row[s.column_name].toString()}
                        </TableCell>
                      ))}
                    </>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default EntityList;
