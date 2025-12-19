package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.chore.execution.ChoreExecutionDto;

public record ChoreDto(
        Long id,
        String name,
        Integer intervalDays,
        ChoreExecutionDto lastExecution
) {
}
