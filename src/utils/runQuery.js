import { createAgentTables, createPropertyTables } from './queryFunctions';
(async () => {
  await createAgentTables();
  await createPropertyTables();
})();