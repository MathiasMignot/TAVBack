-- Revert TAT:init from pg

BEGIN;

DROP TABLE "users","documents" CASCADE ;

COMMIT;
