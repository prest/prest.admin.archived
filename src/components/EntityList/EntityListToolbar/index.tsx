import React, { ReactElement } from 'react';
import clsx from 'clsx';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import { useStyles } from './EntityListToolbar.styles';
import { WithStyles } from '@material-ui/core/styles/withStyles';

interface EntityListToolbarProps extends WithStyles {
  numSelected: number;
  entity: string;
}

export const EntityListToolbar = ({ classes, numSelected, entity }: EntityListToolbarProps): ReactElement => (
  <Toolbar
    className={clsx(classes.root, {
      [classes.highlight]: numSelected > 0,
    })}
  >
    {numSelected > 0 ? (
      <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
        {numSelected} selected
      </Typography>
    ) : (
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {entity}
      </Typography>
    )}
    {numSelected > 0 ? (
      <Tooltip title="Delete">
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    ) : null}
  </Toolbar>
);

export default useStyles(EntityListToolbar);
