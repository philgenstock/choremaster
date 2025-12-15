package de.philgenstock.choremaster.chore.execution;

import java.time.LocalDateTime;

public record ChoreExecutionDto(
        Long id,
        String executorName,
        LocalDateTime executedAt
) {
}
