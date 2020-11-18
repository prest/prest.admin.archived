import React from 'react';
import { createStyles, fade, WithStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import { CustomTheme } from '~/theme';

const IndexStyles = (theme: CustomTheme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    background: theme.palette.appBarColor,
    zIndex: 5,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    '& > h6': {
      marginLeft: '10px',
      display: 'none',

      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    '& > img': {
      maxHeight: '40px',
    },

    [theme.breakpoints.up('sm')]: {
      flex: 1,
    },
  },
  search: {
    flex: 7,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      flex: 2,
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

const useStyles = withStyles(IndexStyles);

interface Props extends WithStyles<typeof IndexStyles>{}

export const Header = ({ classes }: Props): React.ReactElement => (
  <div className={classes.grow}>
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <div className={classes.title}>
          <img src="/site/logo.png" />
          <Typography variant="h6" noWrap>
            pRest
          </Typography>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div className={classes.sectionDesktop} />
      </Toolbar>
    </AppBar>
  </div>
);

export default useStyles(Header);
