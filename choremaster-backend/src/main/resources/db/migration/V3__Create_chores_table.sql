CREATE TABLE chore (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    household_id BIGINT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_chore_household FOREIGN KEY (household_id) REFERENCES households(id) ON DELETE CASCADE
);

CREATE INDEX idx_chore_household ON chore(household_id);
