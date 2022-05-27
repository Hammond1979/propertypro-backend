export const createAgentTable = `
DROP TABLE IF EXISTS agents;
CREATE TABLE "agents" (
"id" serial primary key,
"email" varchar (200) UNIQUE NOT NULL,
"first_name" varchar (200) NOT NULL,
"last_name" varchar (200) NOT NULL,
"phone_number" varchar (11) NOT NULL,
"password" varchar (160) NOT NULL
);
`;

export const createPropertyTable = `
DROP TABLE IF EXISTS properties;
CREATE TABLE "properties" (
  "id" serial primary key,
  "agent_id" integer REFERENCES agentS(id),
  "image_url" varchar NOT NULL,
  "title" varchar (200) NOT NULL,
  "address" varchar (200) NOT NULL,
  "city" varchar (200) NOT NULL,
  "land_area" varchar (200) NOT NULL,
  "no_of_baths" integer NOT NULL,
  "no_of_beds" integer NOT NULL,
  "land_size" integer NOT NULL,
  "created_at" timestamp,
  "updated_at" timestamp
);
`;

export const dropMessagesTable = 'DROP TABLE agents';
export const dropPropertyTable = 'DROP TABLE properties';