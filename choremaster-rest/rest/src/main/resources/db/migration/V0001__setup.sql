CREATE TABLE household
(
    id   bigint GENERATED ALWAYS AS IDENTITY,
    name varchar(50) NOT NULL
);

CREATE UNIQUE INDEX ON household(id);

CREATE TABLE chore
(
    id   bigint GENERATED ALWAYS AS IDENTITY,
    name varchar(50) NOT NULL,
    household_id bigint references household(id)
);

CREATE UNIQUE INDEX ON chore(id);