package de.philgenstock.choremaster.chore.execution;

import de.philgenstock.choremaster.chore.Chore;
import de.philgenstock.choremaster.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ChoreExecutionService {

    private final ChoreExecutionRepository choreExecutionRepository;

    public List<ChoreExecution> getExecutionsByChore(Chore chore) {
        return choreExecutionRepository.findByChoreOrderByCreatedDateDesc(chore);
    }

    public ChoreExecution executeChore(Chore chore, User executor) {
        ChoreExecution choreExecution = new ChoreExecution(chore, executor);
        return choreExecutionRepository.save(choreExecution);
    }
}
