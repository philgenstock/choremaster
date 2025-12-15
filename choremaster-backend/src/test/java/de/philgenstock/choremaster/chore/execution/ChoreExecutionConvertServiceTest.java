package de.philgenstock.choremaster.chore.execution;

import de.philgenstock.choremaster.chore.Chore;
import de.philgenstock.choremaster.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static de.philgenstock.choremaster.chore.ChoreBuilder.aChore;
import static de.philgenstock.choremaster.chore.execution.ChoreExecutionBuilder.aChoreExecution;
import static de.philgenstock.choremaster.user.UserBuilder.aUser;
import static org.assertj.core.api.Assertions.assertThat;

class ChoreExecutionConvertServiceTest {

    private ChoreExecutionConvertService choreExecutionConvertService;

    @BeforeEach
    void setUp() {
        choreExecutionConvertService = new ChoreExecutionConvertService();
    }

    @Test
    void toDto_shouldConvertChoreExecutionToDto() {
        // Given
        User executor = aUser()
                .withName("John Doe")
                .withEmail("john@example.com")
                .build();

        Chore chore = aChore()
                .withName("Clean the kitchen")
                .build();

        LocalDateTime executedAt = LocalDateTime.of(2024, 3, 15, 14, 30);

        ChoreExecution choreExecution = aChoreExecution()
                .withId(10L)
                .withChore(chore)
                .withExecutor(executor)
                .withCreatedDate(executedAt)
                .build();

        // When
        ChoreExecutionDto result = choreExecutionConvertService.toDto(choreExecution);

        // Then
        assertThat(result)
                .extracting(ChoreExecutionDto::id, ChoreExecutionDto::executorName, ChoreExecutionDto::executedAt)
                .containsExactly(10L, "John Doe", executedAt);
    }

    @Test
    void toDto_shouldUseExecutorNameFromUser() {
        // Given
        User executor = aUser()
                .withName("Jane Smith")
                .build();

        ChoreExecution choreExecution = aChoreExecution()
                .withExecutor(executor)
                .build();

        // When
        ChoreExecutionDto result = choreExecutionConvertService.toDto(choreExecution);

        // Then
        assertThat(result.executorName()).isEqualTo("Jane Smith");
    }
}
