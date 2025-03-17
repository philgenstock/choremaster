CREATE TABLE users
(
    id   bigint GENERATED ALWAYS AS IDENTITY,
    created_date TIMESTAMP WITH TIME ZONE NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE UNIQUE INDEX ON users(id);
CREATE UNIQUE INDEX ON users(email);

ALTER TABLE household
    ADD COLUMN owner_id bigint references users(id)