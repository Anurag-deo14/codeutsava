--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.0

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
-- Name: citycapacity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.citycapacity (
    cityname character varying(50) NOT NULL,
    lowcapacity integer,
    highcapacity integer
);


ALTER TABLE public.citycapacity OWNER TO postgres;

--
-- Name: co2emissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.co2emissions (
    cityname character varying(50) NOT NULL,
    delhi numeric,
    chennai numeric,
    mumbai numeric,
    nagpur numeric,
    raipur numeric
);


ALTER TABLE public.co2emissions OWNER TO postgres;

--
-- Name: delivery_deadlines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delivery_deadlines (
    cityname character varying(50) NOT NULL,
    delhi integer,
    chennai integer,
    mumbai integer,
    nagpur integer,
    raipur integer
);


ALTER TABLE public.delivery_deadlines OWNER TO postgres;

--
-- Name: delivery_leadtime; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delivery_leadtime (
    cityname character varying(50) NOT NULL,
    delhi integer,
    chennai integer,
    mumbai integer,
    nagpur integer,
    raipur integer
);


ALTER TABLE public.delivery_leadtime OWNER TO postgres;

--
-- Name: fixed_cost; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fixed_cost (
    cityname character varying(50) NOT NULL,
    low integer,
    high integer
);


ALTER TABLE public.fixed_cost OWNER TO postgres;

--
-- Name: freight_costs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.freight_costs (
    cityname character varying(50) NOT NULL,
    delhi integer,
    chennai integer,
    mumbai integer,
    nagpur integer,
    raipur integer
);


ALTER TABLE public.freight_costs OWNER TO postgres;

--
-- Name: monthly_demand; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.monthly_demand (
    cityname character varying(50) NOT NULL,
    demand numeric
);


ALTER TABLE public.monthly_demand OWNER TO postgres;

--
-- Name: storage_costs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.storage_costs (
    cityname character varying(50) NOT NULL,
    low numeric,
    high numeric
);


ALTER TABLE public.storage_costs OWNER TO postgres;

--
-- Name: variable_costs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.variable_costs (
    cityname character varying(50) NOT NULL,
    delhi integer,
    chennai integer,
    mumbai integer,
    nagpur integer,
    raipur integer
);


ALTER TABLE public.variable_costs OWNER TO postgres;

--
-- Data for Name: citycapacity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.citycapacity (cityname, lowcapacity, highcapacity) FROM stdin;
Delhi	500	1000
Chennai	500	1000
Mumbai	500	1000
Nagpur	500	1000
Raipur	500	1000
\.


--
-- Data for Name: co2emissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.co2emissions (cityname, delhi, chennai, mumbai, nagpur, raipur) FROM stdin;
Delhi	0	84.0620948	299.3171657	125.5220626	181.069151
Chennai	84.0620948	0	267.65434	140.7914846	149.3079066
Mumbai	299.3171657	267.65434	0	282.6249786	127.7262914
Nagpur	125.5220626	140.7914846	282.6249786	0	191.4090893
Raipur	181.069151	149.3079066	127.7262914	191.4090893	0
\.


--
-- Data for Name: delivery_deadlines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.delivery_deadlines (cityname, delhi, chennai, mumbai, nagpur, raipur) FROM stdin;
Delhi	30	30	30	30	30
Chennai	30	30	30	30	30
Mumbai	30	30	30	30	30
Nagpur	30	30	30	30	30
Raipur	30	30	30	30	30
\.


--
-- Data for Name: delivery_leadtime; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.delivery_leadtime (cityname, delhi, chennai, mumbai, nagpur, raipur) FROM stdin;
Delhi	3	21	65	29	41
Chennai	21	3	59	33	34
Mumbai	65	59	3	62	30
Nagpur	29	33	62	3	43
Raipur	41	34	30	43	3
\.


--
-- Data for Name: fixed_cost; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fixed_cost (cityname, low, high) FROM stdin;
Delhi	6500	9500
Chennai	4980	7270
Mumbai	6230	9100
Nagpur	3230	4730
Raipur	2110	6160
\.


--
-- Data for Name: freight_costs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.freight_costs (cityname, delhi, chennai, mumbai, nagpur, raipur) FROM stdin;
Delhi	0	12250	1100	16100	8778
Chennai	13335	0	8617	20244	10073
Mumbai	15400	22750	0	43610	14350
Nagpur	16450	22050	28000	0	29750
Raipur	13650	15400	24500	29400	0
\.


--
-- Data for Name: monthly_demand; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.monthly_demand (cityname, demand) FROM stdin;
Delhi	2800000
Chennai	90000
Mumbai	1700000
Nagpur	145000
Raipur	160000
\.


--
-- Data for Name: storage_costs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.storage_costs (cityname, low, high) FROM stdin;
Delhi	43.33333333	63.33333333
Chennai	33.2	48.46666667
Mumbai	41.53333333	60.66666667
Nagpur	21.53333333	31.53333333
Raipur	14.06666667	41.06666667
\.


--
-- Data for Name: variable_costs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.variable_costs (cityname, delhi, chennai, mumbai, nagpur, raipur) FROM stdin;
Delhi	12	12	12	12	12
Chennai	13	13	13	13	13
Mumbai	10	10	10	10	10
Nagpur	8	8	8	8	8
Raipur	5	5	5	5	5
\.


--
-- Name: citycapacity citycapacity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citycapacity
    ADD CONSTRAINT citycapacity_pkey PRIMARY KEY (cityname);


--
-- Name: co2emissions co2emissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.co2emissions
    ADD CONSTRAINT co2emissions_pkey PRIMARY KEY (cityname);


--
-- Name: delivery_deadlines delivery_deadlines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_deadlines
    ADD CONSTRAINT delivery_deadlines_pkey PRIMARY KEY (cityname);


--
-- Name: delivery_leadtime distance_between_cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delivery_leadtime
    ADD CONSTRAINT distance_between_cities_pkey PRIMARY KEY (cityname);


--
-- Name: freight_costs freight_costs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.freight_costs
    ADD CONSTRAINT freight_costs_pkey PRIMARY KEY (cityname);


--
-- Name: monthly_demand monthly_demand_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_demand
    ADD CONSTRAINT monthly_demand_pkey PRIMARY KEY (cityname);


--
-- Name: fixed_cost production_range_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fixed_cost
    ADD CONSTRAINT production_range_pkey PRIMARY KEY (cityname);


--
-- Name: storage_costs storage_costs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.storage_costs
    ADD CONSTRAINT storage_costs_pkey PRIMARY KEY (cityname);


--
-- Name: variable_costs variable_costs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variable_costs
    ADD CONSTRAINT variable_costs_pkey PRIMARY KEY (cityname);


--
-- PostgreSQL database dump complete
--

