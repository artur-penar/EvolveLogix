--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Debian 16.1-1.pgdg120+1)

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

ALTER TABLE ONLY public.users_userprofile_user_permissions DROP CONSTRAINT users_userprofile_us_userprofile_id_34544737_fk_users_use;
ALTER TABLE ONLY public.users_userprofile_user_permissions DROP CONSTRAINT users_userprofile_us_permission_id_393136b6_fk_auth_perm;
ALTER TABLE ONLY public.users_userprofile_groups DROP CONSTRAINT users_userprofile_groups_group_id_3de53dbf_fk_auth_group_id;
ALTER TABLE ONLY public.users_userprofile_groups DROP CONSTRAINT users_userprofile_gr_userprofile_id_a4496a80_fk_users_use;
ALTER TABLE ONLY public.users_userdetail DROP CONSTRAINT users_userdetail_user_id_7fecda38_fk_users_userprofile_id;
ALTER TABLE ONLY public.users_strengthrecord DROP CONSTRAINT users_strengthrecord_user_id_e5882b5f_fk_users_userprofile_id;
ALTER TABLE ONLY public.users_strengthrecord DROP CONSTRAINT users_strengthrecord_exercise_id_b8c127e9_fk_training_;
ALTER TABLE ONLY public.training_log_traininglog DROP CONSTRAINT training_log_trainin_user_id_77dcff83_fk_users_use;
ALTER TABLE ONLY public.training_log_trainingsession DROP CONSTRAINT training_log_trainin_training_log_id_0b40c37a_fk_training_;
ALTER TABLE ONLY public.training_log_set DROP CONSTRAINT training_log_set_exercise_in_session__c5635c4e_fk_training_;
ALTER TABLE ONLY public.training_log_exerciseinsession DROP CONSTRAINT training_log_exercis_training_session_id_33f6ee73_fk_training_;
ALTER TABLE ONLY public.training_log_exercise_muscle_group DROP CONSTRAINT training_log_exercis_musclegroup_id_b1f4e280_fk_training_;
ALTER TABLE ONLY public.training_log_exerciseinsession DROP CONSTRAINT training_log_exercis_exercise_id_f558b7ba_fk_training_;
ALTER TABLE ONLY public.training_log_exercise_muscle_group DROP CONSTRAINT training_log_exercis_exercise_id_a8d53de8_fk_training_;
ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_userprofile_id;
ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co;
ALTER TABLE ONLY public.authtoken_token DROP CONSTRAINT authtoken_token_user_id_35299eff_fk_users_userprofile_id;
ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
DROP INDEX public.users_userprofile_user_permissions_userprofile_id_34544737;
DROP INDEX public.users_userprofile_user_permissions_permission_id_393136b6;
DROP INDEX public.users_userprofile_groups_userprofile_id_a4496a80;
DROP INDEX public.users_userprofile_groups_group_id_3de53dbf;
DROP INDEX public.users_userprofile_email_ee577bf6_like;
DROP INDEX public.users_userdetail_user_id_7fecda38;
DROP INDEX public.users_strengthrecord_user_id_e5882b5f;
DROP INDEX public.users_strengthrecord_exercise_id_b8c127e9;
DROP INDEX public.training_log_trainingsession_training_log_id_0b40c37a;
DROP INDEX public.training_log_traininglog_user_id_77dcff83;
DROP INDEX public.training_log_set_exercise_in_session_id_c5635c4e;
DROP INDEX public.training_log_exerciseinsession_training_session_id_33f6ee73;
DROP INDEX public.training_log_exerciseinsession_exercise_id_f558b7ba;
DROP INDEX public.training_log_exercise_muscle_group_musclegroup_id_b1f4e280;
DROP INDEX public.training_log_exercise_muscle_group_exercise_id_a8d53de8;
DROP INDEX public.django_session_session_key_c0390e0f_like;
DROP INDEX public.django_session_expire_date_a5c62663;
DROP INDEX public.django_admin_log_user_id_c564eba6;
DROP INDEX public.django_admin_log_content_type_id_c4bce8eb;
DROP INDEX public.authtoken_token_key_10f0b77e_like;
DROP INDEX public.auth_permission_content_type_id_2f476e4b;
DROP INDEX public.auth_group_permissions_permission_id_84c5c92e;
DROP INDEX public.auth_group_permissions_group_id_b120cbf9;
DROP INDEX public.auth_group_name_a6ea08ec_like;
ALTER TABLE ONLY public.users_userprofile_user_permissions DROP CONSTRAINT users_userprofile_user_permissions_pkey;
ALTER TABLE ONLY public.users_userprofile_user_permissions DROP CONSTRAINT users_userprofile_user_p_userprofile_id_permissio_d0215190_uniq;
ALTER TABLE ONLY public.users_userprofile DROP CONSTRAINT users_userprofile_pkey;
ALTER TABLE ONLY public.users_userprofile_groups DROP CONSTRAINT users_userprofile_groups_userprofile_id_group_id_823cf2fc_uniq;
ALTER TABLE ONLY public.users_userprofile_groups DROP CONSTRAINT users_userprofile_groups_pkey;
ALTER TABLE ONLY public.users_userprofile DROP CONSTRAINT users_userprofile_email_key;
ALTER TABLE ONLY public.users_userdetail DROP CONSTRAINT users_userdetail_pkey;
ALTER TABLE ONLY public.users_strengthrecord DROP CONSTRAINT users_strengthrecord_pkey;
ALTER TABLE ONLY public.training_log_trainingsession DROP CONSTRAINT training_log_trainingsession_pkey;
ALTER TABLE ONLY public.training_log_traininglog DROP CONSTRAINT training_log_traininglog_pkey;
ALTER TABLE ONLY public.training_log_set DROP CONSTRAINT training_log_set_pkey;
ALTER TABLE ONLY public.training_log_musclegroup DROP CONSTRAINT training_log_musclegroup_pkey;
ALTER TABLE ONLY public.training_log_exerciseinsession DROP CONSTRAINT training_log_exerciseinsession_pkey;
ALTER TABLE ONLY public.training_log_exercise DROP CONSTRAINT training_log_exercise_pkey;
ALTER TABLE ONLY public.training_log_exercise_muscle_group DROP CONSTRAINT training_log_exercise_muscle_group_pkey;
ALTER TABLE ONLY public.training_log_exercise_muscle_group DROP CONSTRAINT training_log_exercise_mu_exercise_id_musclegroup__6852c9ad_uniq;
ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq;
ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
ALTER TABLE ONLY public.authtoken_token DROP CONSTRAINT authtoken_token_user_id_key;
ALTER TABLE ONLY public.authtoken_token DROP CONSTRAINT authtoken_token_pkey;
ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq;
ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
DROP TABLE public.users_userprofile_user_permissions;
DROP TABLE public.users_userprofile_groups;
DROP TABLE public.users_userprofile;
DROP TABLE public.users_userdetail;
DROP TABLE public.users_strengthrecord;
DROP TABLE public.training_log_trainingsession;
DROP TABLE public.training_log_traininglog;
DROP TABLE public.training_log_set;
DROP TABLE public.training_log_musclegroup;
DROP TABLE public.training_log_exerciseinsession;
DROP TABLE public.training_log_exercise_muscle_group;
DROP TABLE public.training_log_exercise;
DROP TABLE public.django_session;
DROP TABLE public.django_migrations;
DROP TABLE public.django_content_type;
DROP TABLE public.django_admin_log;
DROP TABLE public.authtoken_token;
DROP TABLE public.auth_permission;
DROP TABLE public.auth_group_permissions;
DROP TABLE public.auth_group;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_group_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: authtoken_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authtoken_token (
    key character varying(40) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.authtoken_token OWNER TO postgres;

--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_admin_log ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_content_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: training_log_exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.training_log_exercise (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.training_log_exercise OWNER TO postgres;

--
-- Name: training_log_exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.training_log_exercise ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.training_log_exercise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: training_log_exercise_muscle_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.training_log_exercise_muscle_group (
    id bigint NOT NULL,
    exercise_id bigint NOT NULL,
    musclegroup_id bigint NOT NULL
);


ALTER TABLE public.training_log_exercise_muscle_group OWNER TO postgres;

--
-- Name: training_log_exercise_muscle_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.training_log_exercise_muscle_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.training_log_exercise_muscle_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: training_log_exerciseinsession; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.training_log_exerciseinsession (
    id bigint NOT NULL,
    "order" integer NOT NULL,
    comment text,
    exercise_id bigint NOT NULL,
    training_session_id bigint NOT NULL,
    CONSTRAINT training_log_exerciseinsession_order_check CHECK (("order" >= 0))
);


ALTER TABLE public.training_log_exerciseinsession OWNER TO postgres;

--
-- Name: training_log_exerciseinsession_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.training_log_exerciseinsession ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.training_log_exerciseinsession_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: training_log_musclegroup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.training_log_musclegroup (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.training_log_musclegroup OWNER TO postgres;

--
-- Name: training_log_musclegroup_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.training_log_musclegroup ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.training_log_musclegroup_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: training_log_set; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.training_log_set (
    id bigint NOT NULL,
    set_number integer NOT NULL,
    weight double precision NOT NULL,
    repetitions integer NOT NULL,
    comment text,
    exercise_in_session_id bigint NOT NULL,
    CONSTRAINT training_log_set_repetitions_check CHECK ((repetitions >= 0)),
    CONSTRAINT training_log_set_set_number_check CHECK ((set_number >= 0))
);


ALTER TABLE public.training_log_set OWNER TO postgres;

--
-- Name: training_log_set_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.training_log_set ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.training_log_set_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: training_log_traininglog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.training_log_traininglog (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.training_log_traininglog OWNER TO postgres;

--
-- Name: training_log_traininglog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.training_log_traininglog ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.training_log_traininglog_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: training_log_trainingsession; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.training_log_trainingsession (
    id bigint NOT NULL,
    date date NOT NULL,
    comment text,
    training_log_id bigint NOT NULL,
    is_completed boolean NOT NULL,
    description text
);


ALTER TABLE public.training_log_trainingsession OWNER TO postgres;

--
-- Name: training_log_trainingsession_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.training_log_trainingsession ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.training_log_trainingsession_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_strengthrecord; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_strengthrecord (
    id bigint NOT NULL,
    weight numeric(5,2) NOT NULL,
    record_date timestamp with time zone NOT NULL,
    exercise_id bigint NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.users_strengthrecord OWNER TO postgres;

--
-- Name: users_strengthrecord_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_strengthrecord ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_strengthrecord_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_userdetail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_userdetail (
    id bigint NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    height numeric(4,1) NOT NULL,
    weight numeric(4,1) NOT NULL,
    calves numeric(4,1) NOT NULL,
    thigh numeric(4,1) NOT NULL,
    hips numeric(4,1) NOT NULL,
    waist numeric(4,1) NOT NULL,
    chest numeric(4,1) NOT NULL,
    neck numeric(4,1) NOT NULL,
    arm numeric(4,1) NOT NULL,
    forearm numeric(4,1) NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.users_userdetail OWNER TO postgres;

--
-- Name: users_userdetail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_userdetail ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_userdetail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_userprofile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_userprofile (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    email character varying(155) NOT NULL,
    user_name character varying(155) NOT NULL,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL
);


ALTER TABLE public.users_userprofile OWNER TO postgres;

--
-- Name: users_userprofile_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_userprofile_groups (
    id bigint NOT NULL,
    userprofile_id bigint NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.users_userprofile_groups OWNER TO postgres;

--
-- Name: users_userprofile_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_userprofile_groups ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_userprofile_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_userprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_userprofile ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_userprofile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_userprofile_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_userprofile_user_permissions (
    id bigint NOT NULL,
    userprofile_id bigint NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.users_userprofile_user_permissions OWNER TO postgres;

--
-- Name: users_userprofile_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_userprofile_user_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_userprofile_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add user profile	6	add_userprofile
22	Can change user profile	6	change_userprofile
23	Can delete user profile	6	delete_userprofile
24	Can view user profile	6	view_userprofile
25	Can add exercise	7	add_exercise
26	Can change exercise	7	change_exercise
27	Can delete exercise	7	delete_exercise
28	Can view exercise	7	view_exercise
29	Can add muscle group	8	add_musclegroup
30	Can change muscle group	8	change_musclegroup
31	Can delete muscle group	8	delete_musclegroup
32	Can view muscle group	8	view_musclegroup
33	Can add exercise in session	9	add_exerciseinsession
34	Can change exercise in session	9	change_exerciseinsession
35	Can delete exercise in session	9	delete_exerciseinsession
36	Can view exercise in session	9	view_exerciseinsession
37	Can add training log	10	add_traininglog
38	Can change training log	10	change_traininglog
39	Can delete training log	10	delete_traininglog
40	Can view training log	10	view_traininglog
41	Can add training session	11	add_trainingsession
42	Can change training session	11	change_trainingsession
43	Can delete training session	11	delete_trainingsession
44	Can view training session	11	view_trainingsession
45	Can add set	12	add_set
46	Can change set	12	change_set
47	Can delete set	12	delete_set
48	Can view set	12	view_set
49	Can add Token	13	add_token
50	Can change Token	13	change_token
51	Can delete Token	13	delete_token
52	Can view Token	13	view_token
53	Can add token	14	add_tokenproxy
54	Can change token	14	change_tokenproxy
55	Can delete token	14	delete_tokenproxy
56	Can view token	14	view_tokenproxy
57	Can add user detail	15	add_userdetail
58	Can change user detail	15	change_userdetail
59	Can delete user detail	15	delete_userdetail
60	Can view user detail	15	view_userdetail
61	Can add strength record	16	add_strengthrecord
62	Can change strength record	16	change_strengthrecord
63	Can delete strength record	16	delete_strengthrecord
64	Can view strength record	16	view_strengthrecord
\.


--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authtoken_token (key, created, user_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2023-11-21 13:51:00.46741+00	1	admin - Admin Training Log	1	[{"added": {}}]	10	2
2	2023-11-21 13:53:00.623392+00	1	Pectoral muscles	1	[{"added": {}}]	8	2
3	2023-11-21 13:53:38.641986+00	2	Quadriceps	1	[{"added": {}}]	8	2
4	2023-11-21 13:59:57.820314+00	1	Barbell bench press	1	[{"added": {}}]	7	2
5	2023-11-21 14:00:41.047512+00	2	Barbell Squat	1	[{"added": {}}]	7	2
6	2023-11-21 14:09:10.516979+00	2	Squat	2	[{"changed": {"fields": ["Name"]}}]	7	2
7	2023-11-21 14:09:22.11229+00	1	Bench press	2	[{"changed": {"fields": ["Name"]}}]	7	2
8	2023-12-12 16:38:53.766989+00	3	Barbell Front Squat	1	[{"added": {}}]	7	2
9	2023-12-12 16:41:43.99974+00	4	Hex Bar Deadlift	1	[{"added": {}}]	7	2
10	2024-01-18 17:28:32.247961+00	74	admin - Admin Training Log - 5's of squat: 2024-01-19	1	[{"added": {}}]	11	2
11	2024-01-25 07:52:38.339682+00	2	admin - Squat - 200kg	1	[{"added": {}}]	16	2
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	users	userprofile
7	training_log	exercise
8	training_log	musclegroup
9	training_log	exerciseinsession
10	training_log	traininglog
11	training_log	trainingsession
12	training_log	set
13	authtoken	token
14	authtoken	tokenproxy
15	users	userdetail
16	users	strengthrecord
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2023-11-19 09:38:44.602803+00
2	contenttypes	0002_remove_content_type_name	2023-11-19 09:38:44.619426+00
3	auth	0001_initial	2023-11-19 09:38:44.679674+00
4	auth	0002_alter_permission_name_max_length	2023-11-19 09:38:44.690354+00
5	auth	0003_alter_user_email_max_length	2023-11-19 09:38:44.701281+00
6	auth	0004_alter_user_username_opts	2023-11-19 09:38:44.71463+00
7	auth	0005_alter_user_last_login_null	2023-11-19 09:38:44.726848+00
8	auth	0006_require_contenttypes_0002	2023-11-19 09:38:44.733249+00
9	auth	0007_alter_validators_add_error_messages	2023-11-19 09:38:44.747552+00
10	auth	0008_alter_user_username_max_length	2023-11-19 09:38:44.762227+00
11	auth	0009_alter_user_last_name_max_length	2023-11-19 09:38:44.775106+00
12	auth	0010_alter_group_name_max_length	2023-11-19 09:38:44.789235+00
13	auth	0011_update_proxy_permissions	2023-11-19 09:38:44.802985+00
14	auth	0012_alter_user_first_name_max_length	2023-11-19 09:38:44.817748+00
15	users	0001_initial	2023-11-19 09:38:44.883262+00
16	admin	0001_initial	2023-11-19 09:38:44.913753+00
17	admin	0002_logentry_remove_auto_add	2023-11-19 09:38:44.930808+00
18	admin	0003_logentry_add_action_flag_choices	2023-11-19 09:38:44.944988+00
19	authtoken	0001_initial	2023-11-19 09:38:44.972647+00
20	authtoken	0002_auto_20160226_1747	2023-11-19 09:38:45.01902+00
21	authtoken	0003_tokenproxy	2023-11-19 09:38:45.024045+00
22	sessions	0001_initial	2023-11-19 09:38:45.043534+00
23	training_log	0001_initial	2023-11-19 09:38:45.054689+00
24	training_log	0002_musclegroup	2023-11-19 09:38:45.067776+00
25	training_log	0003_exercise_muscle_group	2023-11-19 09:38:45.098606+00
26	training_log	0004_exerciseinsession_traininglog_trainingsession_set_and_more	2023-11-19 09:38:45.190693+00
27	training_log	0005_alter_exerciseinsession_order_alter_traininglog_name	2023-11-19 09:38:45.21536+00
28	training_log	0006_alter_set_exercise_in_session	2023-11-19 09:38:45.242087+00
29	training_log	0007_trainingsession_is_completed	2023-12-12 18:05:25.251623+00
30	training_log	0008_trainingsession_description	2024-01-18 17:25:15.105222+00
31	users	0002_alter_userprofile_email_alter_userprofile_user_name_and_more	2024-01-23 13:39:23.238186+00
32	users	0003_alter_userdetail_arm_alter_userdetail_calves_and_more	2024-01-24 17:14:24.651283+00
33	users	0004_strengthrecord	2024-01-25 07:49:25.361046+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
dp6hjp2mrsh960admf6q2pso4a1q5hpi	.eJxVjMEOwiAQRP-FsyELBWw9evcbyC67laqBpLQn47_bJj3ocea9mbeKuC45rk3mOLG6KKtOvx1hekrZAT-w3KtOtSzzRHpX9EGbvlWW1_Vw_w4ytrytz4G5g-AtOu-8MWgHS8NIBnzPPsEIwIB9EhZB4iC4xcBOOgQgZPX5At3DOMI:1r5R8s:F9dvSnCEAuq8HgR8CucOYkyxFHPvO4kJT4aDFsXk40I	2023-12-05 13:50:18.827274+00
t0nmrh2mxmfmkkvum7qs59vie5q0yhnl	.eJxVjMEOwiAQRP-FsyELBWw9evcbyC67laqBpLQn47_bJj3ocea9mbeKuC45rk3mOLG6KKtOvx1hekrZAT-w3KtOtSzzRHpX9EGbvlWW1_Vw_w4ytrytz4G5g-AtOu-8MWgHS8NIBnzPPsEIwIB9EhZB4iC4xcBOOgQgZPX5At3DOMI:1rBtUK:F4cEE08SU7cKACCe5pDTEfNtpDpNN49P3w1ntaB38iU	2023-12-23 09:19:08.262285+00
rcbdw0o0s7gz6eggxvcoelj86f7qlgl2	.eJxVjMEOwiAQRP-FsyELBWw9evcbyC67laqBpLQn47_bJj3ocea9mbeKuC45rk3mOLG6KKtOvx1hekrZAT-w3KtOtSzzRHpX9EGbvlWW1_Vw_w4ytrytz4G5g-AtOu-8MWgHS8NIBnzPPsEIwIB9EhZB4iC4xcBOOgQgZPX5At3DOMI:1rQWAp:WxMjylhzVmRzd9T3Q0Q31LoPMpnVISsiL1yZHhtnEto	2024-02-01 17:27:27.936376+00
f6mddj6kl4ojtyn66epembyiiqhr46i2	.eJxVjMEOwiAQRP-FsyELBWw9evcbyC67laqBpLQn47_bJj3ocea9mbeKuC45rk3mOLG6KKtOvx1hekrZAT-w3KtOtSzzRHpX9EGbvlWW1_Vw_w4ytrytz4G5g-AtOu-8MWgHS8NIBnzPPsEIwIB9EhZB4iC4xcBOOgQgZPX5At3DOMI:1rWZEW:0blraC8_1f2kwETHC62afHSA45ysx36P9b0ODWHL9SM	2024-02-18 09:56:16.391694+00
\.


--
-- Data for Name: training_log_exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.training_log_exercise (id, name, description) FROM stdin;
2	Squat	The barbell squat is a compound strength-training exercise that engages multiple muscle groups, including the quadriceps, hamstrings, glutes, lower back, and core. In this exercise, the individual places a barbell on their upper back, bends at the hips and knees to lower into a squat position, and then returns to a standing position. Barbell squats are fundamental for building lower body strength, improving overall stability, and are a key component of many strength-training
1	Bench press	The barbell bench press is a compound weightlifting exercise primarily targeting the pectoral muscles, deltoids, and triceps. In this exercise, the individual lies on a bench and lifts a barbell vertically, extending and flexing the arms to work the upper body. It is a fundamental strength-training movement and is often included in workout routines to enhance chest development and overall upper body strength.
3	Barbell Front Squat	The barbell front squat is a compound exercise that targets multiple muscle groups, primarily the quadriceps, hamstrings, and glutes. It also engages the core muscles for stabilization.
4	Hex Bar Deadlift	The hex bar deadlift, also known as the trap bar deadlift, is a powerful compound exercise that primarily targets the posterior chain, including the hamstrings, glutes, and lower back.
\.


--
-- Data for Name: training_log_exercise_muscle_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.training_log_exercise_muscle_group (id, exercise_id, musclegroup_id) FROM stdin;
1	1	1
2	2	2
3	3	2
4	4	2
\.


--
-- Data for Name: training_log_exerciseinsession; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.training_log_exerciseinsession (id, "order", comment, exercise_id, training_session_id) FROM stdin;
137	1	\N	2	66
138	1	\N	2	67
139	1	\N	2	71
748	1	\N	3	74
749	2	\N	2	74
750	1	\N	2	63
751	2	\N	1	63
752	3	\N	4	63
753	1	\N	1	76
62	1	\N	2	31
70	1	\N	2	37
707	1	\N	2	45
71	2	\N	2	37
72	3	\N	3	37
708	2	\N	1	45
164	1	\N	2	65
165	2	\N	2	65
166	3	\N	2	65
42	1	\N	2	32
709	3	\N	1	45
710	1	\N	2	34
712	1	\N	2	73
713	1	\N	2	53
714	1	\N	2	40
715	2	\N	2	40
92	1	\N	2	48
93	1	\N	2	49
94	1	\N	2	50
95	1	\N	2	51
98	1	\N	2	54
99	1	\N	2	55
100	1	\N	2	56
101	1	\N	2	57
102	1	\N	2	58
103	1	\N	2	59
104	1	\N	2	60
105	1	\N	2	61
131	1	\N	2	64
\.


--
-- Data for Name: training_log_musclegroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.training_log_musclegroup (id, name, description) FROM stdin;
1	Pectoral muscles	The pectoral muscles, comprised of the pectoralis major and pectoralis minor, are located in the chest region. The pectoralis major is responsible for shoulder movements like flexion and adduction, while the pectoralis minor aids in scapular stabilization for activities such as pushing and pulling.
2	Quadriceps	The quadriceps, or quads, are a group of four muscles located at the front of the thigh. Comprising the rectus femoris, vastus lateralis, vastus medialis, and vastus intermedius, these muscles work together to extend the knee and play a significant role in activities like walking, running, and jumping. Strong and well-conditioned quadriceps are essential for overall lower body strength and functional movement.
\.


--
-- Data for Name: training_log_set; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.training_log_set (id, set_number, weight, repetitions, comment, exercise_in_session_id) FROM stdin;
61	1	1	1	\N	42
62	2	2	2	\N	42
228	1	13	3	\N	164
229	2	1	1	\N	164
230	1	1	1	\N	165
231	1	1	1	\N	166
85	1	1	1	\N	62
86	2	100	1	\N	62
174	1	13	11	\N	131
175	2	11	11	\N	131
96	1	1	1	\N	70
97	2	30	1	\N	70
98	1	1	1	\N	71
99	1	1	1	\N	72
514	1	1	1	\N	707
515	2	2	2	\N	707
516	1	2	2	\N	708
517	1	1	1	\N	709
518	1	1	1	\N	710
184	1	1	1	\N	137
185	1	12	21	\N	138
186	1	11	1	\N	139
520	1	2	2	\N	712
521	1	21	21	\N	713
522	1	1	1	\N	714
523	1	1	1	\N	715
524	2	2	2	\N	715
122	1	12	12	\N	92
123	1	12	12	\N	93
124	1	21	21	\N	94
125	1	13	13	\N	95
596	1	60	5	\N	748
128	1	100	3	\N	98
129	1	120	1	\N	99
130	1	21	21	\N	100
131	1	21	21	\N	101
132	1	100	10	\N	102
133	1	12	12	\N	103
134	1	12	12	\N	104
135	1	21	21	\N	105
597	2	80	5	\N	748
598	3	100	3	\N	748
599	4	110	2	\N	748
600	5	120	3	\N	748
601	1	120	3	\N	749
602	2	140	2	\N	749
603	3	150	2	\N	749
604	1	2	1	\N	750
605	2	12	21	\N	750
606	1	9	9	\N	751
607	2	1	1	\N	751
608	1	1	1	\N	752
609	1	80	5	\N	753
610	2	90	5	\N	753
611	3	100	5	\N	753
612	4	110	3	\N	753
613	5	115	7	\N	753
\.


--
-- Data for Name: training_log_traininglog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.training_log_traininglog (id, name, user_id) FROM stdin;
1	Admin Training Log	2
2	New log	2
3	Another log	2
4	2024-training-log	2
\.


--
-- Data for Name: training_log_trainingsession; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.training_log_trainingsession (id, date, comment, training_log_id, is_completed, description) FROM stdin;
48	2023-12-30	New log training	2	f	\N
49	2023-12-28	New log trainign 2	2	f	\N
50	2023-12-14	Testing log	2	f	\N
51	2023-12-01	Update state testing	2	f	\N
54	2023-12-13	5/3/1	3	f	\N
55	2023-12-15	5/3/1 - 3's	3	f	\N
56	2023-12-21	5/3/1 - 1's	3	f	\N
57	2023-12-19	5/3/1 - 5's	3	f	\N
58	2023-12-23	5/3/1 - 10's	3	f	\N
59	2023-12-27	19:49	3	f	\N
60	2023-12-25	20:01	3	f	\N
61	2023-11-27	20:03	3	f	\N
32	2023-12-05	haha	1	f	\N
64	2024-01-18	New year training	2	f	\N
31	2023-12-18	updated	1	f	\N
37	2023-12-26	Edited	1	f	\N
45	2023-12-11	22	1	t	\N
34	2023-12-23	asdf	1	f	\N
66	2024-01-18	asd	3	f	\N
67	2024-01-19	asdf	3	f	\N
71	2024-01-04	a	3	f	\N
73	2024-01-12	Heavy doubles.	1	t	\N
53	2023-12-16	gfda	2	t	\N
40	2023-12-01	New	1	t	\N
65	2024-01-19	asd	2	f	\N
74	2024-01-19	Light Weight baby!	1	t	3's of squat
63	2024-01-18	New year training	1	t	New year heavy Squat!
76	2024-01-13	Upper back position control issue.	1	t	3's of Bench Press
\.


--
-- Data for Name: users_strengthrecord; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_strengthrecord (id, weight, record_date, exercise_id, user_id) FROM stdin;
2	200.00	2024-01-25 07:52:38.332589+00	2	2
\.


--
-- Data for Name: users_userdetail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_userdetail (id, updated_at, height, weight, calves, thigh, hips, waist, chest, neck, arm, forearm, user_id) FROM stdin;
1	2024-01-23 13:39:41.62343+00	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	0.0	2
2	2024-01-24 16:55:16.682105+00	40.0	20.0	0.0	0.0	0.0	0.0	40.0	0.0	0.0	0.0	2
3	2024-01-24 17:14:50.978218+00	190.0	120.0	0.0	0.0	0.0	0.0	130.0	0.0	50.0	45.0	2
4	2024-01-25 06:20:45.590046+00	190.0	120.0	45.0	70.0	100.0	80.0	130.0	50.0	50.0	45.0	2
\.


--
-- Data for Name: users_userprofile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_userprofile (id, password, last_login, is_superuser, email, user_name, is_active, is_staff) FROM stdin;
1	pbkdf2_sha256$600000$FJpGb9JH2fST0thcUGPVjn$iAbJlh1ax0woDNK93npBZGS9sNiBtnXnHPdTe7JMJpM=	\N	f	user@gmail.com	user	t	f
2	pbkdf2_sha256$600000$vEpyhCwsxmFh789ZOPiTkx$bNmnM32LPtOeYlotFZTKMj8WVsMSCZSc+nAzAZEkCko=	2024-02-04 09:56:16.387432+00	t	admin@gmail.com	admin	t	t
\.


--
-- Data for Name: users_userprofile_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_userprofile_groups (id, userprofile_id, group_id) FROM stdin;
\.


--
-- Data for Name: users_userprofile_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_userprofile_user_permissions (id, userprofile_id, permission_id) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 64, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 11, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 16, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 33, true);


--
-- Name: training_log_exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_log_exercise_id_seq', 4, true);


--
-- Name: training_log_exercise_muscle_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_log_exercise_muscle_group_id_seq', 4, true);


--
-- Name: training_log_exerciseinsession_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_log_exerciseinsession_id_seq', 753, true);


--
-- Name: training_log_musclegroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_log_musclegroup_id_seq', 2, true);


--
-- Name: training_log_set_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_log_set_id_seq', 613, true);


--
-- Name: training_log_traininglog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_log_traininglog_id_seq', 4, true);


--
-- Name: training_log_trainingsession_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.training_log_trainingsession_id_seq', 76, true);


--
-- Name: users_strengthrecord_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_strengthrecord_id_seq', 2, true);


--
-- Name: users_userdetail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userdetail_id_seq', 4, true);


--
-- Name: users_userprofile_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userprofile_groups_id_seq', 1, false);


--
-- Name: users_userprofile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userprofile_id_seq', 2, true);


--
-- Name: users_userprofile_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userprofile_user_permissions_id_seq', 1, false);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: authtoken_token authtoken_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_pkey PRIMARY KEY (key);


--
-- Name: authtoken_token authtoken_token_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_key UNIQUE (user_id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: training_log_exercise_muscle_group training_log_exercise_mu_exercise_id_musclegroup__6852c9ad_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_exercise_muscle_group
    ADD CONSTRAINT training_log_exercise_mu_exercise_id_musclegroup__6852c9ad_uniq UNIQUE (exercise_id, musclegroup_id);


--
-- Name: training_log_exercise_muscle_group training_log_exercise_muscle_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_exercise_muscle_group
    ADD CONSTRAINT training_log_exercise_muscle_group_pkey PRIMARY KEY (id);


--
-- Name: training_log_exercise training_log_exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_exercise
    ADD CONSTRAINT training_log_exercise_pkey PRIMARY KEY (id);


--
-- Name: training_log_exerciseinsession training_log_exerciseinsession_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_exerciseinsession
    ADD CONSTRAINT training_log_exerciseinsession_pkey PRIMARY KEY (id);


--
-- Name: training_log_musclegroup training_log_musclegroup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_musclegroup
    ADD CONSTRAINT training_log_musclegroup_pkey PRIMARY KEY (id);


--
-- Name: training_log_set training_log_set_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_set
    ADD CONSTRAINT training_log_set_pkey PRIMARY KEY (id);


--
-- Name: training_log_traininglog training_log_traininglog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_traininglog
    ADD CONSTRAINT training_log_traininglog_pkey PRIMARY KEY (id);


--
-- Name: training_log_trainingsession training_log_trainingsession_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_trainingsession
    ADD CONSTRAINT training_log_trainingsession_pkey PRIMARY KEY (id);


--
-- Name: users_strengthrecord users_strengthrecord_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_strengthrecord
    ADD CONSTRAINT users_strengthrecord_pkey PRIMARY KEY (id);


--
-- Name: users_userdetail users_userdetail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userdetail
    ADD CONSTRAINT users_userdetail_pkey PRIMARY KEY (id);


--
-- Name: users_userprofile users_userprofile_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userprofile
    ADD CONSTRAINT users_userprofile_email_key UNIQUE (email);


--
-- Name: users_userprofile_groups users_userprofile_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userprofile_groups
    ADD CONSTRAINT users_userprofile_groups_pkey PRIMARY KEY (id);


--
-- Name: users_userprofile_groups users_userprofile_groups_userprofile_id_group_id_823cf2fc_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userprofile_groups
    ADD CONSTRAINT users_userprofile_groups_userprofile_id_group_id_823cf2fc_uniq UNIQUE (userprofile_id, group_id);


--
-- Name: users_userprofile users_userprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userprofile
    ADD CONSTRAINT users_userprofile_pkey PRIMARY KEY (id);


--
-- Name: users_userprofile_user_permissions users_userprofile_user_p_userprofile_id_permissio_d0215190_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userprofile_user_permissions
    ADD CONSTRAINT users_userprofile_user_p_userprofile_id_permissio_d0215190_uniq UNIQUE (userprofile_id, permission_id);


--
-- Name: users_userprofile_user_permissions users_userprofile_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userprofile_user_permissions
    ADD CONSTRAINT users_userprofile_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: authtoken_token_key_10f0b77e_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authtoken_token_key_10f0b77e_like ON public.authtoken_token USING btree (key varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: training_log_exercise_muscle_group_exercise_id_a8d53de8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_log_exercise_muscle_group_exercise_id_a8d53de8 ON public.training_log_exercise_muscle_group USING btree (exercise_id);


--
-- Name: training_log_exercise_muscle_group_musclegroup_id_b1f4e280; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_log_exercise_muscle_group_musclegroup_id_b1f4e280 ON public.training_log_exercise_muscle_group USING btree (musclegroup_id);


--
-- Name: training_log_exerciseinsession_exercise_id_f558b7ba; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_log_exerciseinsession_exercise_id_f558b7ba ON public.training_log_exerciseinsession USING btree (exercise_id);


--
-- Name: training_log_exerciseinsession_training_session_id_33f6ee73; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_log_exerciseinsession_training_session_id_33f6ee73 ON public.training_log_exerciseinsession USING btree (training_session_id);


--
-- Name: training_log_set_exercise_in_session_id_c5635c4e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_log_set_exercise_in_session_id_c5635c4e ON public.training_log_set USING btree (exercise_in_session_id);


--
-- Name: training_log_traininglog_user_id_77dcff83; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_log_traininglog_user_id_77dcff83 ON public.training_log_traininglog USING btree (user_id);


--
-- Name: training_log_trainingsession_training_log_id_0b40c37a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_log_trainingsession_training_log_id_0b40c37a ON public.training_log_trainingsession USING btree (training_log_id);


--
-- Name: users_strengthrecord_exercise_id_b8c127e9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_strengthrecord_exercise_id_b8c127e9 ON public.users_strengthrecord USING btree (exercise_id);


--
-- Name: users_strengthrecord_user_id_e5882b5f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_strengthrecord_user_id_e5882b5f ON public.users_strengthrecord USING btree (user_id);


--
-- Name: users_userdetail_user_id_7fecda38; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_userdetail_user_id_7fecda38 ON public.users_userdetail USING btree (user_id);


--
-- Name: users_userprofile_email_ee577bf6_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_userprofile_email_ee577bf6_like ON public.users_userprofile USING btree (email varchar_pattern_ops);


--
-- Name: users_userprofile_groups_group_id_3de53dbf; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_userprofile_groups_group_id_3de53dbf ON public.users_userprofile_groups USING btree (group_id);


--
-- Name: users_userprofile_groups_userprofile_id_a4496a80; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_userprofile_groups_userprofile_id_a4496a80 ON public.users_userprofile_groups USING btree (userprofile_id);


--
-- Name: users_userprofile_user_permissions_permission_id_393136b6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_userprofile_user_permissions_permission_id_393136b6 ON public.users_userprofile_user_permissions USING btree (permission_id);


--
-- Name: users_userprofile_user_permissions_userprofile_id_34544737; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_userprofile_user_permissions_userprofile_id_34544737 ON public.users_userprofile_user_permissions USING btree (userprofile_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authtoken_token authtoken_token_user_id_35299eff_fk_users_userprofile_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_35299eff_fk_users_userprofile_id FOREIGN KEY (user_id) REFERENCES public.users_userprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_users_userprofile_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_userprofile_id FOREIGN KEY (user_id) REFERENCES public.users_userprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: training_log_exercise_muscle_group training_log_exercis_exercise_id_a8d53de8_fk_training_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_exercise_muscle_group
    ADD CONSTRAINT training_log_exercis_exercise_id_a8d53de8_fk_training_ FOREIGN KEY (exercise_id) REFERENCES public.training_log_exercise(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: training_log_exerciseinsession training_log_exercis_exercise_id_f558b7ba_fk_training_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_exerciseinsession
    ADD CONSTRAINT training_log_exercis_exercise_id_f558b7ba_fk_training_ FOREIGN KEY (exercise_id) REFERENCES public.training_log_exercise(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: training_log_exercise_muscle_group training_log_exercis_musclegroup_id_b1f4e280_fk_training_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_exercise_muscle_group
    ADD CONSTRAINT training_log_exercis_musclegroup_id_b1f4e280_fk_training_ FOREIGN KEY (musclegroup_id) REFERENCES public.training_log_musclegroup(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: training_log_exerciseinsession training_log_exercis_training_session_id_33f6ee73_fk_training_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_exerciseinsession
    ADD CONSTRAINT training_log_exercis_training_session_id_33f6ee73_fk_training_ FOREIGN KEY (training_session_id) REFERENCES public.training_log_trainingsession(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: training_log_set training_log_set_exercise_in_session__c5635c4e_fk_training_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_set
    ADD CONSTRAINT training_log_set_exercise_in_session__c5635c4e_fk_training_ FOREIGN KEY (exercise_in_session_id) REFERENCES public.training_log_exerciseinsession(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: training_log_trainingsession training_log_trainin_training_log_id_0b40c37a_fk_training_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_trainingsession
    ADD CONSTRAINT training_log_trainin_training_log_id_0b40c37a_fk_training_ FOREIGN KEY (training_log_id) REFERENCES public.training_log_traininglog(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: training_log_traininglog training_log_trainin_user_id_77dcff83_fk_users_use; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.training_log_traininglog
    ADD CONSTRAINT training_log_trainin_user_id_77dcff83_fk_users_use FOREIGN KEY (user_id) REFERENCES public.users_userprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_strengthrecord users_strengthrecord_exercise_id_b8c127e9_fk_training_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_strengthrecord
    ADD CONSTRAINT users_strengthrecord_exercise_id_b8c127e9_fk_training_ FOREIGN KEY (exercise_id) REFERENCES public.training_log_exercise(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_strengthrecord users_strengthrecord_user_id_e5882b5f_fk_users_userprofile_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_strengthrecord
    ADD CONSTRAINT users_strengthrecord_user_id_e5882b5f_fk_users_userprofile_id FOREIGN KEY (user_id) REFERENCES public.users_userprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_userdetail users_userdetail_user_id_7fecda38_fk_users_userprofile_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userdetail
    ADD CONSTRAINT users_userdetail_user_id_7fecda38_fk_users_userprofile_id FOREIGN KEY (user_id) REFERENCES public.users_userprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_userprofile_groups users_userprofile_gr_userprofile_id_a4496a80_fk_users_use; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userprofile_groups
    ADD CONSTRAINT users_userprofile_gr_userprofile_id_a4496a80_fk_users_use FOREIGN KEY (userprofile_id) REFERENCES public.users_userprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_userprofile_groups users_userprofile_groups_group_id_3de53dbf_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userprofile_groups
    ADD CONSTRAINT users_userprofile_groups_group_id_3de53dbf_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_userprofile_user_permissions users_userprofile_us_permission_id_393136b6_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userprofile_user_permissions
    ADD CONSTRAINT users_userprofile_us_permission_id_393136b6_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_userprofile_user_permissions users_userprofile_us_userprofile_id_34544737_fk_users_use; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_userprofile_user_permissions
    ADD CONSTRAINT users_userprofile_us_userprofile_id_34544737_fk_users_use FOREIGN KEY (userprofile_id) REFERENCES public.users_userprofile(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

