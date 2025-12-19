package de.philgenstock.choremaster.chore.execution;

import de.philgenstock.choremaster.chore.Chore;
import de.philgenstock.choremaster.chore.ChoreRepository;
import de.philgenstock.choremaster.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class ChoreExecutionService {

    private final ChoreExecutionRepository choreExecutionRepository;
    private final ChoreRepository choreRepository;

    public List<ChoreExecution> getExecutionsByChore(Chore chore) {
        return choreExecutionRepository.findByChoreOrderByCreatedDateDesc(chore);
    }

    @Transactional
    public ChoreExecution executeChore(Chore chore, User executor) {
        ChoreExecution choreExecution = new ChoreExecution(chore, executor);
        ChoreExecution savedExecution = choreExecutionRepository.save(choreExecution);

        chore.setLastExecution(savedExecution);
        choreRepository.save(chore);

        return savedExecution;
    }
}
