import React from 'react';
import Particles, { IParticlesParams } from 'react-particles-js';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core/styles';


const BackgroundParticlesStyles = (theme: Theme) => createStyles({
  root: {
    '& > canvas': {
      background: theme.palette.secondary.main,
    },
  },
})
const useStyles = withStyles(BackgroundParticlesStyles)

const styles = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
};

const params: IParticlesParams = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#9580FF',
    },
    shape: {
      type: 'polygon',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.4,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#9580FF',
      opacity: 0.1,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
};

interface Props extends WithStyles<typeof BackgroundParticlesStyles>{
  
}

export const BackgroundParticles = ({classes}: Props): React.ReactElement => {
  return <Particles style={styles} params={params} className={classes.root} />;
};

export default useStyles(BackgroundParticles);
