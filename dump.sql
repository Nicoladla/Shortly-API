--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: shortUrls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."shortUrls" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


--
-- Name: shortUrls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."shortUrls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortUrls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."shortUrls_id_seq" OWNED BY public."shortUrls".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(10) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "confirmPassword" text NOT NULL,
    CONSTRAINT users_check CHECK ((password = "confirmPassword"))
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: shortUrls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortUrls" ALTER COLUMN id SET DEFAULT nextval('public."shortUrls_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: shortUrls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."shortUrls" VALUES (5, 8, 'https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?node-id=0%3A1&t=qMeNcfYawDnymR5u-0', 'OYeSrV4f90G4Q_2oeA3vg', 4, '2022-12-23');
INSERT INTO public."shortUrls" VALUES (4, 10, 'https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?node-id=0%3A1&t=qMeNcfYawDnymR5u-0', 'zHBPQDjVicF6FMzfcikwX', 2, '2022-12-23');
INSERT INTO public."shortUrls" VALUES (6, 8, 'https://www.youtube.com/', 'ay9P-GjW9zYo9_-atPpba', 5, '2022-12-23');
INSERT INTO public."shortUrls" VALUES (7, 8, 'https://translate.google.com.br/?hl=pt-BR', 'PNn_6H6ZcwS3FIjCnXTM8', 0, '2022-12-23');
INSERT INTO public."shortUrls" VALUES (2, 10, 'https://www.npmjs.com/package/nanoid', 'aSBhYITwASOv3IaInxDFh', 5, '2022-12-22');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (8, 'Lima', 'li@gmail.com', '$2b$10$REWVZK4XrMbLhh5l9HBFC.FkbCZl7ndfkFBdhQUO.MlbDs3QQnYX2', '$2b$10$REWVZK4XrMbLhh5l9HBFC.FkbCZl7ndfkFBdhQUO.MlbDs3QQnYX2');
INSERT INTO public.users VALUES (9, 'Fulano', 'fulano@gmail.com', '$2b$10$leFn.Pi7bfUZi7VbrtrQh.nW9vgG.mVEd1k.1QFzjyhDRzbp5L2x.', '$2b$10$leFn.Pi7bfUZi7VbrtrQh.nW9vgG.mVEd1k.1QFzjyhDRzbp5L2x.');
INSERT INTO public.users VALUES (10, 'Nicolas', 'ni@gmail.com', '$2b$10$zxRn3LMi9g0H3u9Rdd4oMuN6YLd66t0l6P2yAjkoMhmnDbwQDHxaK', '$2b$10$zxRn3LMi9g0H3u9Rdd4oMuN6YLd66t0l6P2yAjkoMhmnDbwQDHxaK');


--
-- Name: shortUrls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."shortUrls_id_seq"', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: shortUrls shortUrls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortUrls"
    ADD CONSTRAINT "shortUrls_pkey" PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: shortUrls shortUrls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."shortUrls"
    ADD CONSTRAINT "shortUrls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

