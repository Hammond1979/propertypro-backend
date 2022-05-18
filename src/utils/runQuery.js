import { createAgentTables, insertIntoTables } from './queryFunctions';
(async () => {
  await createAgentTables();
  // await createPropertyTables();
})();