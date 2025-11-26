package de.philgenstock.choremaster.chore.execution;

import org.springframework.stereotype.Service;

@Service
public class ChoreExecutionConvertService {

    public ChoreExecutionDto toDto(ChoreExecution choreExecution) {
        return new ChoreExecutionDto(
                choreExecution.getId(),
                choreExecution.getExecutor().getName(),
                choreExecution.getCreatedDate()
        );
    }
}
