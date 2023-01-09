-- users table

DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id serial,
    user_id serial,
    username character varying(50),
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to reach;

-- leaderboards table

DROP TABLE IF EXISTS public.leaderboards;

CREATE TABLE IF NOT EXISTS public.leaderboards
(
    id serial,
    user_id integer,
    difficulty integer,
    score integer,
    guesses text[],
    feedbacks text[],
    CONSTRAINT leaderboards_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.leaderboards
    OWNER to reach;

GRANT ALL ON TABLE public.leaderboards TO reach;