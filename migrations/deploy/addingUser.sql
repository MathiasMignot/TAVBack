-- Deploy TAT:addingUser to pg

BEGIN;

insert into users(name,email,password)
VALUES('fabrice','fabmignot30@gmail.com','Fraggle0348$');

COMMIT;
