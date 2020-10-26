import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { PRestTableShowItem } from '@postgresrest/node';

import cli from '~/client/nextApi';
import EntityList from '~/components/EntityList';

const useStyles = withStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
}));

type Props = {
  entity: string;
  schema: PRestTableShowItem[];
  classes: { container: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
};

export const PRestEntity = ({ classes, entity, schema, data }: Props): React.ReactElement => (
  <div className={classes.container}>
    <EntityList entity={entity} rows={data} schema={schema} />
  </div>
);

PRestEntity.getInitialProps = async (ctx) => {
  const { entity } = ctx.query;
  const table = cli.table(entity);
  const schema = await table.show();
  const data = await table.query();

  return { entity, schema, data };
};

export default useStyles(PRestEntity);
