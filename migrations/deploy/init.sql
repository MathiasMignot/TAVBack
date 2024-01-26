-- Deploy TAT:init to pg

BEGIN;

-- Deploy PrivateBread:init to pg

BEGIN;

    CREATE TABLE "users"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz
);
    --CREATE TABLE "categories"(
   -- "id"  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    --"name" TEXT NOT NULL, 
   -- "description" TEXT NOT NULL,
--"created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  --  "updated_at" timestamptz
  --  );


CREATE TABLE "documents"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "document_name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "category_id" INT ,
    "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamptz
);

ALTER TABLE "users"
ADD CONSTRAINT email_regex 
CHECK(
    "email" ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);


COMMIT;
