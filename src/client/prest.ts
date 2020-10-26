import PRestAPI from '@postgresrest/node';
import { PREST_URL } from '~/config';

export default new PRestAPI(PREST_URL);
