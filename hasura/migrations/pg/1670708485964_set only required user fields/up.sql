
alter table "public"."users" drop column "name" cascade;

alter table "public"."users" drop column "emailVerified" cascade;

alter table "public"."users" drop column "image" cascade;

alter table "public"."users" add column "password" text
 null;

alter table "public"."users" add column "created_at" timestamptz
 null default now();
