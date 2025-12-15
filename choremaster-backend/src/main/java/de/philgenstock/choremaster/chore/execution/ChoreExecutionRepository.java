package de.philgenstock.choremaster.chore.execution;

import de.philgenstock.choremaster.chore.Chore;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChoreExecutionRepository extends CrudRepository<ChoreExecution, Long> {
    List<ChoreExecution> findByChoreOrderByCreatedDateDesc(Chore chore);
}
