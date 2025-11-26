CREATE TABLE chore_execution (
    id BIGSERIAL PRIMARY KEY,
    chore_id BIGINT NOT NULL,
    executor_id BIGINT NOT NULL,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_chore_execution_chore FOREIGN KEY (chore_id) REFERENCES chore(id) ON DELETE CASCADE,
    CONSTRAINT fk_chore_execution_executor FOREIGN KEY (executor_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_chore_execution_chore ON chore_execution(chore_id);
