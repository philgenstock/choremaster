package de.philgenstock.choremaster.chore.execution;

import de.philgenstock.choremaster.chore.Chore;
import de.philgenstock.choremaster.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static de.philgenstock.choremaster.chore.ChoreBuilder.aChore;
import static de.philgenstock.choremaster.chore.execution.ChoreExecutionBuilder.aChoreExecution;
import static de.philgenstock.choremaster.user.UserBuilder.aUser;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChoreExecutionServiceTest {

    @Mock
    private ChoreExecutionRepository choreExecutionRepository;

    @InjectMocks
    private ChoreExecutionService choreExecutionService;

    @Test
    void getExecutionsByChore_shouldReturnExecutions() {
        // Given
        Chore chore = aChore().build();
        ChoreExecution execution1 = aChoreExecution()
                .withId(1L)
                .withChore(chore)
                .build();

        List<ChoreExecution> executions = List.of(execution1);
        when(choreExecutionRepository.findByChoreOrderByCreatedDateDesc(chore)).thenReturn(executions);

        // When
        List<ChoreExecution> result = choreExecutionService.getExecutionsByChore(chore);

        // Then
        assertThat(result)
                .containsExactlyInAnyOrder(execution1);
    }

    @Test
    void executeChore_shouldCreateAndSaveChoreExecution() {
        // Given
        Chore chore = aChore().withName("Vacuum").build();
        User executor = aUser().withName("Jane Doe").build();

        ChoreExecution savedExecution = aChoreExecution()
                .withId(5L)
                .withChore(chore)
                .withExecutor(executor)
                .build();

        when(choreExecutionRepository.save(any(ChoreExecution.class))).thenReturn(savedExecution);

        // When
        ChoreExecution result = choreExecutionService.executeChore(chore, executor);

        // Then
        assertThat(result)
                .extracting(ChoreExecution::getId, ChoreExecution::getChore, ChoreExecution::getExecutor)
                .containsExactly(5L, chore, executor);

        ArgumentCaptor<ChoreExecution> executionCaptor = ArgumentCaptor.forClass(ChoreExecution.class);
        verify(choreExecutionRepository, times(1)).save(executionCaptor.capture());

        ChoreExecution capturedExecution = executionCaptor.getValue();
        assertThat(capturedExecution)
                .extracting(ChoreExecution::getChore, ChoreExecution::getExecutor)
                .containsExactly(chore, executor);
    }
}
