--
-- PostgreSQL database dump
--

\restrict JRwePPRtPQjUhEcf1yrNObVyMkgKLoUuMxQowB1KZiPEbAgFVzgYNecnnBNROEE

-- Dumped from database version 17.7 (Debian 17.7-3.pgdg13+1)
-- Dumped by pg_dump version 17.7 (Debian 17.7-3.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_id_user_details_fkey";
ALTER TABLE IF EXISTS ONLY public."Trip" DROP CONSTRAINT IF EXISTS "Trip_id_user_fkey";
ALTER TABLE IF EXISTS ONLY public."Photo" DROP CONSTRAINT IF EXISTS "Photo_id_user_fkey";
ALTER TABLE IF EXISTS ONLY public."GearPart" DROP CONSTRAINT IF EXISTS "GearPart_id_user_fkey";
ALTER TABLE IF EXISTS ONLY public."BikeCard" DROP CONSTRAINT IF EXISTS "BikeCard_id_user_fkey";
DROP INDEX IF EXISTS public."User_email_key";
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE IF EXISTS ONLY public."UserDetails" DROP CONSTRAINT IF EXISTS "UserDetails_pkey";
ALTER TABLE IF EXISTS ONLY public."Trip" DROP CONSTRAINT IF EXISTS "Trip_pkey";
ALTER TABLE IF EXISTS ONLY public."Photo" DROP CONSTRAINT IF EXISTS "Photo_pkey";
ALTER TABLE IF EXISTS ONLY public."GearPart" DROP CONSTRAINT IF EXISTS "GearPart_pkey";
ALTER TABLE IF EXISTS ONLY public."BikeCard" DROP CONSTRAINT IF EXISTS "BikeCard_pkey";
ALTER TABLE IF EXISTS public."UserDetails" ALTER COLUMN id_user_details DROP DEFAULT;
ALTER TABLE IF EXISTS public."User" ALTER COLUMN id_user DROP DEFAULT;
ALTER TABLE IF EXISTS public."Trip" ALTER COLUMN id_trip DROP DEFAULT;
ALTER TABLE IF EXISTS public."Photo" ALTER COLUMN id_photo DROP DEFAULT;
ALTER TABLE IF EXISTS public."GearPart" ALTER COLUMN id_gear_part DROP DEFAULT;
ALTER TABLE IF EXISTS public."BikeCard" ALTER COLUMN id_bike_card DROP DEFAULT;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP SEQUENCE IF EXISTS public."User_id_user_seq";
DROP SEQUENCE IF EXISTS public."UserDetails_id_user_details_seq";
DROP TABLE IF EXISTS public."UserDetails";
DROP TABLE IF EXISTS public."User";
DROP SEQUENCE IF EXISTS public."Trip_id_trip_seq";
DROP TABLE IF EXISTS public."Trip";
DROP SEQUENCE IF EXISTS public."Photo_id_photo_seq";
DROP TABLE IF EXISTS public."Photo";
DROP SEQUENCE IF EXISTS public."GearPart_id_gear_part_seq";
DROP TABLE IF EXISTS public."GearPart";
DROP SEQUENCE IF EXISTS public."BikeCard_id_bike_card_seq";
DROP TABLE IF EXISTS public."BikeCard";
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: docker
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO docker;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: docker
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BikeCard; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."BikeCard" (
    id_bike_card integer NOT NULL,
    id_user integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    image_type text NOT NULL,
    photo_path text
);


ALTER TABLE public."BikeCard" OWNER TO docker;

--
-- Name: BikeCard_id_bike_card_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."BikeCard_id_bike_card_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BikeCard_id_bike_card_seq" OWNER TO docker;

--
-- Name: BikeCard_id_bike_card_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."BikeCard_id_bike_card_seq" OWNED BY public."BikeCard".id_bike_card;


--
-- Name: GearPart; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."GearPart" (
    id_gear_part integer NOT NULL,
    id_user integer NOT NULL,
    purchase_date timestamp(3) without time zone,
    name text NOT NULL,
    value integer,
    comment text
);


ALTER TABLE public."GearPart" OWNER TO docker;

--
-- Name: GearPart_id_gear_part_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."GearPart_id_gear_part_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."GearPart_id_gear_part_seq" OWNER TO docker;

--
-- Name: GearPart_id_gear_part_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."GearPart_id_gear_part_seq" OWNED BY public."GearPart".id_gear_part;


--
-- Name: Photo; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."Photo" (
    id_photo integer NOT NULL,
    id_user integer NOT NULL,
    path text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL
);


ALTER TABLE public."Photo" OWNER TO docker;

--
-- Name: Photo_id_photo_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."Photo_id_photo_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Photo_id_photo_seq" OWNER TO docker;

--
-- Name: Photo_id_photo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."Photo_id_photo_seq" OWNED BY public."Photo".id_photo;


--
-- Name: Trip; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."Trip" (
    id_trip integer NOT NULL,
    id_user integer NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "time" text,
    distance integer NOT NULL,
    elevation integer,
    description text
);


ALTER TABLE public."Trip" OWNER TO docker;

--
-- Name: Trip_id_trip_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."Trip_id_trip_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Trip_id_trip_seq" OWNER TO docker;

--
-- Name: Trip_id_trip_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."Trip_id_trip_seq" OWNED BY public."Trip".id_trip;


--
-- Name: User; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."User" (
    id_user integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    id_user_details integer NOT NULL
);


ALTER TABLE public."User" OWNER TO docker;

--
-- Name: UserDetails; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public."UserDetails" (
    id_user_details integer NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    role text NOT NULL
);


ALTER TABLE public."UserDetails" OWNER TO docker;

--
-- Name: UserDetails_id_user_details_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."UserDetails_id_user_details_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."UserDetails_id_user_details_seq" OWNER TO docker;

--
-- Name: UserDetails_id_user_details_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."UserDetails_id_user_details_seq" OWNED BY public."UserDetails".id_user_details;


--
-- Name: User_id_user_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public."User_id_user_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_user_seq" OWNER TO docker;

--
-- Name: User_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public."User_id_user_seq" OWNED BY public."User".id_user;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO docker;

--
-- Name: BikeCard id_bike_card; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."BikeCard" ALTER COLUMN id_bike_card SET DEFAULT nextval('public."BikeCard_id_bike_card_seq"'::regclass);


--
-- Name: GearPart id_gear_part; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."GearPart" ALTER COLUMN id_gear_part SET DEFAULT nextval('public."GearPart_id_gear_part_seq"'::regclass);


--
-- Name: Photo id_photo; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Photo" ALTER COLUMN id_photo SET DEFAULT nextval('public."Photo_id_photo_seq"'::regclass);


--
-- Name: Trip id_trip; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Trip" ALTER COLUMN id_trip SET DEFAULT nextval('public."Trip_id_trip_seq"'::regclass);


--
-- Name: User id_user; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."User" ALTER COLUMN id_user SET DEFAULT nextval('public."User_id_user_seq"'::regclass);


--
-- Name: UserDetails id_user_details; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."UserDetails" ALTER COLUMN id_user_details SET DEFAULT nextval('public."UserDetails_id_user_details_seq"'::regclass);


--
-- Data for Name: BikeCard; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."BikeCard" (id_bike_card, id_user, name, description, image_type, photo_path) FROM stdin;
1	1	Kross	Rower na dojazdy do pracy.	image/jpeg	1767030909479.jpg
2	1	Full	Ten jest do poskakania po lasach i nie tylko.	image/jpeg	1767030981663.jpg
3	1	Zabytkowy rower	Zabytkowy rower polskiej produkcji z lat 80 - tych. Niezbyt wygody, ale za to pewnie nie za szybko jeździ :D	image/jpeg	1767031255641.jpg
\.


--
-- Data for Name: GearPart; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."GearPart" (id_gear_part, id_user, purchase_date, name, value, comment) FROM stdin;
1	1	2025-12-17 00:00:00	Łańcuch rowerowy Shimano	59	Łańcuch ma 112 ogniw
2	1	2025-12-03 00:00:00	Pompka	121	Mała, podręczna pompka mieszcząca się do plecaka.
3	3	2025-11-04 00:00:00	Rękawiczki	30	Cienkie rękawiczki do jazdy jesienią
4	4	2025-06-16 00:00:00	Kask	230	Profesjonalny kask rowerowy
\.


--
-- Data for Name: Photo; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."Photo" (id_photo, id_user, path, status) FROM stdin;
2	1	1766613794480_alpine-trail-7.jpg	done
3	1	1766614622129_alpine-trail-7.jpg	done
4	1	1766614827237_alpine-trail-7.jpg	done
5	4	1767083772519_zabytkowy rower.jpg	done
6	4	1767083790914_alpine-trail-7.jpg	done
7	4	1767083798442_esker.jpg	done
8	2	1767084089392_esker.jpg	done
9	2	1767084096302_alpine-trail-7.jpg	done
10	2	1767084112833_147056_Krakowski_Dariusz_Lab3.png	done
11	2	1767084127036_Muzeum.png	done
\.


--
-- Data for Name: Trip; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."Trip" (id_trip, id_user, date, "time", distance, elevation, description) FROM stdin;
1	1	2025-12-09 00:00:00	01:25	32	120	Poranna przejażdżka
2	1	2025-11-06 00:00:00	02:36	57	1205	Wyprawa w góry, zakończona sukcesem.
3	3	2025-12-12 00:00:00	01:12	23	31	Wycieczka popołudniowa.
4	3	2025-08-07 00:00:00	04:53	102	320	Wakacyjna setka
5	4	2025-10-21 00:00:00	05:36	135	152	Całodniowa wycieczka
6	4	2025-07-29 00:00:00	02:01	25	39	Zwiedzanie okolic
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."User" (id_user, email, password, id_user_details) FROM stdin;
1	test@wp.pl	$2b$10$z2DtmpASMy2xombKEn/fR.rj5Srh0pTBRgO8/GsbdYQjbU.PbooHe	1
2	admin@wp.pl	$2b$10$z9AZzttt9HQKLnJyZQihZOA0gNEQ4d4iXA6Fa5Y3V9IXdiIQ5y1Ce	2
3	test2@wp.pl	$2b$10$BfsTegTLMr.4AC6CujO3vek4yNeRmqvHDmfI7IWHRGCoWcm9YeP2S	3
4	test3@wp.pl	$2b$10$RKPrwSl3q.D3YdZenlZT7eXfad7rq8S.Ip0zXane5EkNAm8dVsk7G	4
\.


--
-- Data for Name: UserDetails; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public."UserDetails" (id_user_details, name, surname, role) FROM stdin;
1	test	test	user
2	admin	admin	admin
3	test	test	user
4	test3	test3	user
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
eb5e0029-3b76-4bb0-8b2a-8acc3103cff5	ce8c05eaf0d57f431e6deb91e0b542b286a536eb2840cf05f0a52877d6ffe680	2025-12-24 21:48:26.619128+00	20251105174315_init	\N	\N	2025-12-24 21:48:26.590675+00	1
e4636d43-3ef3-4970-a27f-201943199a42	dc8d839c67dece12ec873e27efa2a9e0d406dfbac1347b1b84d8e8efee27291a	2025-12-24 21:48:26.633558+00	20251108203653_add_photo_model	\N	\N	2025-12-24 21:48:26.6226+00	1
c4dc92ab-12d6-44f2-89ef-692fa159311c	995e8e27716be098c4d957aed884f47e950518a80d9046edb9abc80106535478	2025-12-24 21:48:26.646188+00	20251108204454_add_photo_model	\N	\N	2025-12-24 21:48:26.636489+00	1
51a7ddf4-7c52-4406-824c-5d5e9e6b9e72	b474430010bab0f38d9ddc492eead53161e6c9bc7f18c15a008f19bf876232f7	2025-12-24 21:48:26.657829+00	20251224210338_add_photo_status	\N	\N	2025-12-24 21:48:26.648875+00	1
\.


--
-- Name: BikeCard_id_bike_card_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."BikeCard_id_bike_card_seq"', 3, true);


--
-- Name: GearPart_id_gear_part_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."GearPart_id_gear_part_seq"', 4, true);


--
-- Name: Photo_id_photo_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."Photo_id_photo_seq"', 11, true);


--
-- Name: Trip_id_trip_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."Trip_id_trip_seq"', 6, true);


--
-- Name: UserDetails_id_user_details_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."UserDetails_id_user_details_seq"', 4, true);


--
-- Name: User_id_user_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public."User_id_user_seq"', 4, true);


--
-- Name: BikeCard BikeCard_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."BikeCard"
    ADD CONSTRAINT "BikeCard_pkey" PRIMARY KEY (id_bike_card);


--
-- Name: GearPart GearPart_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."GearPart"
    ADD CONSTRAINT "GearPart_pkey" PRIMARY KEY (id_gear_part);


--
-- Name: Photo Photo_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Photo"
    ADD CONSTRAINT "Photo_pkey" PRIMARY KEY (id_photo);


--
-- Name: Trip Trip_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_pkey" PRIMARY KEY (id_trip);


--
-- Name: UserDetails UserDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."UserDetails"
    ADD CONSTRAINT "UserDetails_pkey" PRIMARY KEY (id_user_details);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id_user);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: docker
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: BikeCard BikeCard_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."BikeCard"
    ADD CONSTRAINT "BikeCard_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."User"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: GearPart GearPart_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."GearPart"
    ADD CONSTRAINT "GearPart_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."User"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Photo Photo_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Photo"
    ADD CONSTRAINT "Photo_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."User"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Trip Trip_id_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."Trip"
    ADD CONSTRAINT "Trip_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."User"(id_user) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: User User_id_user_details_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_id_user_details_fkey" FOREIGN KEY (id_user_details) REFERENCES public."UserDetails"(id_user_details) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: docker
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict JRwePPRtPQjUhEcf1yrNObVyMkgKLoUuMxQowB1KZiPEbAgFVzgYNecnnBNROEE

