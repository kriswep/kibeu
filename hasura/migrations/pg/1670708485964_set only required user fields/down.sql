
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."users" add column "created_at" timestamptz
--  null default now();

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."users" add column "password" text
--  null;

alter table "public"."users" alter column "image" drop not null;
alter table "public"."users" add column "image" text;

alter table "public"."users" alter column "emailVerified" drop not null;
alter table "public"."users" add column "emailVerified" timestamptz;

alter table "public"."users" alter column "name" drop not null;
alter table "public"."users" add column "name" text;
