package de.philgenstock.choremaster.chore.execution;

import de.philgenstock.choremaster.chore.Chore;
import de.philgenstock.choremaster.chore.ChoreRepository;
import de.philgenstock.choremaster.user.User;
import de.philgenstock.choremaster.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ChoreExecutionApplicationService {

    private final ChoreExecutionService choreExecutionService;
    private final ChoreExecutionConvertService choreExecutionConvertService;
    private final ChoreRepository choreRepository;
    private final UserService userService;

    public List<ChoreExecutionDto> getExecutionsByChoreId(Long choreId) {
        Chore chore = choreRepository.findById(choreId)
                .orElseThrow(() -> new IllegalArgumentException("Chore not found with id: " + choreId));
        return choreExecutionService.getExecutionsByChore(chore).stream()
                .map(choreExecutionConvertService::toDto)
                .toList();
    }

    @Transactional
    public ChoreExecutionDto executeChore(Long choreId) {
        Chore chore = choreRepository.findById(choreId)
                .orElseThrow(() -> new IllegalArgumentException("Chore not found with id: " + choreId));
        User user = userService.getCurrentUser();
        ChoreExecution choreExecution = choreExecutionService.executeChore(chore, user);
        return choreExecutionConvertService.toDto(choreExecution);
    }
}
