export const createAgentTable = `
DROP TABLE IF EXISTS agents;
CREATE TABLE "agents" (
"id" serial primary key,
"email" varchar (200) UNIQUE NOT NULL,
"first_name" varchar (200) NOT NULL,
"last_name" varchar (200) NOT NULL,
"phone_number" varchar (11) NOT NULL,
"password" varchar (160) NOT NULL
)
`;

// export const createPropertyTable = `
// DROP TABLE IF IT EXIST properties;
// CREATE TABLE "properties" (
//   "id" serial primary key,
//   "agent_id" interger REFERENCES agent(id),
//   "image_url" varchar NOT NULL,
//   " title" varchar (200) NOT NULL,
//   "price" varchar (200) NOT NULL,
//   "status" varchar (200) NOT NULL,
//   "address" varchar (200) NOT NULL,
//   "city" varchar (200) NOT NULL,
//   "neighbourhood" varchar (200) NOT NULL,
//   "lga" varchar (200) NOT NULL,
//   "zip_code" integer NOT NULL,
//   "number_of_baths" integer NOT NULL,
//   " number_of_beds" integer NOT NULL,
//   "land_size" integer NOT NULL,
//   "created_at" timestamp,
//   "updated_at" timestamp,
// )
// `;

// export const dropMessagesTable = 'DROP TABLE agents';
// export const dropPropertyTable = 'DROP TABLE properties';