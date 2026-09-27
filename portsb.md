# backend migration guide

## current dependencies

fabnet uses a postgres-compatible backend for four responsibilities:

- public fabrication locations
- public change submissions
- maker accounts and approved public profiles
- fabrication requests visible to their requester and eligible makers

the map client reads `locations` and writes `submissions` through `src/lib/api.ts`. local network screens use the generated client in `src/integrations/supabase/client.ts` for authentication, maker profiles, and requests.

## migration sequence

1. create a new backend project.
2. apply every sql file in `supabase/migrations` in filename order.
3. confirm every public table has explicit grants, row-level security, and matching policies.
4. copy the required rows using csv or a postgres transfer.
5. set the new public url, publishable key, and project id in the deployment environment.
6. point the public directory client at the new project.
7. test anonymous map reads, anonymous submissions, account sign-in, profile editing, approval visibility, and request visibility.

## required schema

### locations

- `id bigint primary key`
- `name text not null`
- `city text not null`
- `lat double precision not null`
- `lng double precision not null`
- `type text not null`
- `capabilities jsonb not null default '[]'`
- `membership_info text default ''`
- `source_url text default ''`
- `description text default ''`
- `created_at timestamptz not null default now()`

anonymous users need select access only. add an index on `city`.

### submissions

- `id uuid primary key default gen_random_uuid()`
- `created_at timestamptz not null default now()`
- `location_name text not null`
- `suggested_change text not null`
- `source_url text`
- `notes text`
- `city text`
- `address text`
- `status text not null default 'pending'`
- `submitter_email text`

anonymous users need insert access. public read or update access should be removed before storing private moderation notes.

### maker_profiles

use the complete definition in the migrations. important fields include the owner id, alias, city, approximate coordinates, service radius, availability, machine list, capabilities, traits, approval state, and timestamps. public reads must require `approved = true`. signed-in owners may read, insert, and update only their own row.

### fab_requests

use the complete definition in the migrations. requests store job details, quantity, material, urgency, budget, pickup area, file urls, status, and an optional matched maker. requesters may read and update their own rows. approved makers may read open requests in their city. matched makers may read requests assigned to them.

## authentication migration

1. configure email authentication in the destination project.
2. export users through an approved administrative migration process. password hashes cannot be recreated from browser data.
3. if hashes cannot be transferred, import identities without passwords and send password reset links.
4. preserve user ids when importing because maker ownership and request ownership reference them.
5. verify redirect addresses for local development, preview, and production.

## storage migration

the current project has no configured storage bucket. before enabling request files or portfolio uploads, create private buckets and issue short-lived signed urls. do not make home addresses or private job files public.

## server logic migration

the current application has no required server function. maker approval email is planned. implement it as a database-triggered edge function that sends only the profile id and review link to the administrator. keep mail credentials in backend secrets and never return them to the browser.

## differences and limits

- campus resources are reviewed records in the application bundle and must be copied with the source repository.
- map tiles are provided by carto and are not part of the backend migration.
- public location data currently uses a separate client, so both clients must be repointed or consolidated during migration.
- row-level policies and table grants are both required. either one alone is insufficient.