import { NextApiRequest, NextApiResponse } from 'next';
import cli from '~/client/prest';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  cli.show('prest', 'public', req.query.table).then((columns) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(columns));
  });
};
