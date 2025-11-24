package de.philgenstock.choremaster.persistence;

import java.time.LocalDateTime;

public abstract class BaseEntityBuilder<T extends BaseEntity, B extends BaseEntityBuilder<T, B>> {

    protected Long id = 1L;
    protected LocalDateTime createdDate = LocalDateTime.of(2024, 1, 1, 12, 0);
    protected LocalDateTime lastModifiedDate = LocalDateTime.of(2024, 1, 1, 12, 0);

    @SuppressWarnings("unchecked")
    protected B self() {
        return (B) this;
    }

    public B withId(Long id) {
        this.id = id;
        return self();
    }

    public B withCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
        return self();
    }

    public B withLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return self();
    }

    protected void applyBaseFields(T entity) {
        entity.setId(id);
        entity.setCreatedDate(createdDate);
        entity.setLastModifiedDate(lastModifiedDate);
    }

    public abstract T build();
}
