ALTER TABLE chore ADD COLUMN last_execution_id BIGINT;

ALTER TABLE chore ADD CONSTRAINT fk_chore_last_execution
    FOREIGN KEY (last_execution_id) REFERENCES chore_execution(id);

CREATE INDEX idx_chore_last_execution ON chore(last_execution_id);
