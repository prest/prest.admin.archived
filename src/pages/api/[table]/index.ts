import { NextApiRequest, NextApiResponse } from 'next';
import cli from '~/client/prest';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const table = cli.tableConnection('prest', 'public', req.query.table);

  table.query().then((data) => {
    console.log(data);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  });
};
