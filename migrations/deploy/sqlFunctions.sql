-- Deploy 8bit:sql_functions to pg

BEGIN;

-- XXX Add DDLs here.
CREATE FUNCTION insert_document(json) RETURNS documents AS $$
	INSERT INTO "documents" ("document_name", "document", "category_id")
	VALUES (
	   $1->>'document_name',
	   $1->>'document',
	  ( $1->>'category_id'):: int
	)
	RETURNING *;
$$ LANGUAGE sql STRICT VOLATILE;


COMMIT;