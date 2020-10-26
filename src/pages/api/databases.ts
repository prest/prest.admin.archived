import { NextApiRequest, NextApiResponse } from 'next';
import cli from '~/client/prest';

export default (_: NextApiRequest, res: NextApiResponse): void => {
  cli.tablesByDBInSchema('prest.public').then((dbs) => {
    console.log(dbs);
    res.status(200).json(dbs);
  });
};
