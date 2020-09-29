import React from 'react';
import useStyles from './styles';

type Props = {
  code: string;
  message: string;
  description: string;
  classes: any;
};

export const PageError = ({ classes, code, message, description }: Props): React.ReactElement => {
  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>
        {code} <small>{message}</small>
      </h1>
      <h2 className={classes.h2}>{description}</h2>
      <img src="/site/about_img3.png" className={classes.errorImage} />
    </div>
  );
};

export default useStyles(PageError);
