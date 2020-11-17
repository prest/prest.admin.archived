import { PRestTableShowItem, PRestDatabase } from '@postgresrest/node';

interface TableFetcher {
  show(): Promise<PRestTableShowItem[]>;
  query<T>(): Promise<T[]>;
}

// @TODO: Fix remove hardcoded URL
const fetcher = async (path) => {
  const res = await fetch(`http://localhost:3001/api${path}`);
  return await res.json();
};

export default {
  databases: (): Promise<PRestDatabase[]> => fetcher('/databases'),
  table: (table: string): TableFetcher => ({
    show: () => fetcher(`/${table}/show`),
    query: () => fetcher(`/${table}`),
  }),
};
