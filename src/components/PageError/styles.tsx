import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 2,
  },
  errorImage: {
    maxWidth: '300px',
  },
  h1: {
    padding: '0',
    margin: '0',
    fontSize: '120px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    lineHeight: '75px',
    '& > small': {
      textTransform: 'uppercase',
      display: 'block',
      fontSize: '20%',
    },
  },
  h2: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    maxWidth: '300px',
    textAlign: 'center',
    margin: '0 0 40px',
  },
}));

export default useStyles;
