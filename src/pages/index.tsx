import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';

type TableEntity = {
  name: string;
};

type Props = {
  tables: TableEntity[];
};

export const PRestHome = ({ tables }: Props): ReactElement => (
  <List>
    {tables.map(({ name }) => (
      <Link href={`/${name}`} key={name}>
        <ListItem button component="a">
          <ListItemText primary={name} />
        </ListItem>
      </Link>
    ))}
  </List>
);

PRestHome.getInitialProps = async () => {
  const tables = [{ name: 'films' }];
  return { tables };
};

PRestHome.propTypes = {
  tables: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
};

export default PRestHome;
