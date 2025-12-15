package de.philgenstock.choremaster.chore.execution;

import de.philgenstock.choremaster.chore.Chore;
import de.philgenstock.choremaster.persistence.BaseEntity;
import de.philgenstock.choremaster.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "chore_execution")
@Data
public class ChoreExecution extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "chore_id", nullable = false)
    private Chore chore;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "executor_id", nullable = false)
    private User executor;

    public ChoreExecution() {
    }

    public ChoreExecution(Chore chore, User executor) {
        this.chore = chore;
        this.executor = executor;
    }
}
