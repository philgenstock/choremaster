package de.philgenstock.choremaster.chore.execution;

import de.philgenstock.choremaster.chore.Chore;
import de.philgenstock.choremaster.chore.ChoreRepository;
import de.philgenstock.choremaster.user.User;
import de.philgenstock.choremaster.user.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static de.philgenstock.choremaster.chore.ChoreBuilder.aChore;
import static de.philgenstock.choremaster.chore.execution.ChoreExecutionBuilder.aChoreExecution;
import static de.philgenstock.choremaster.household.HouseholdBuilder.aHousehold;
import static de.philgenstock.choremaster.user.UserBuilder.aUser;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChoreExecutionApplicationServiceTest {

    @Mock
    private ChoreExecutionService choreExecutionService;

    @Mock
    private ChoreExecutionConvertService choreExecutionConvertService;

    @Mock
    private ChoreRepository choreRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private ChoreExecutionApplicationService choreExecutionApplicationService;

    @Test
    void getExecutionsByChoreId_shouldReturnExecutionsAsDtos() {
        // Given
        Long choreId = 5L;
        Chore chore = aChore()
                .withId(choreId)
                .withName("Dishes")
                .withHousehold(aHousehold().build())
                .build();

        ChoreExecution execution1 = aChoreExecution().build();

        ChoreExecutionDto dto1 = new ChoreExecutionDto(1L, "Alice", LocalDateTime.of(2024, 3, 15, 10, 0));

        when(choreRepository.findById(choreId)).thenReturn(Optional.of(chore));
        when(choreExecutionService.getExecutionsByChore(chore)).thenReturn(List.of(execution1));
        when(choreExecutionConvertService.toDto(execution1)).thenReturn(dto1);

        // When
        List<ChoreExecutionDto> result = choreExecutionApplicationService.getExecutionsByChoreId(choreId);

        // Then
        assertEquals(1, result.size());
        assertEquals(dto1, result.getFirst());
    }

    @Test
    void executeChore_shouldExecuteChoreAndReturnDto() {
        // Given
        Long choreId = 10L;
        Chore chore = aChore()
                .withId(choreId)
                .build();
        User executor = aUser()
                .build();
        ChoreExecution execution = aChoreExecution()
                .build();

        ChoreExecutionDto dto = new ChoreExecutionDto(100L, "Charlie", LocalDateTime.of(2024, 3, 20, 15, 30));

        when(choreRepository.findById(choreId)).thenReturn(Optional.of(chore));
        when(userService.getCurrentUser()).thenReturn(executor);
        when(choreExecutionService.executeChore(chore, executor)).thenReturn(execution);
        when(choreExecutionConvertService.toDto(execution)).thenReturn(dto);

        // When
        ChoreExecutionDto result = choreExecutionApplicationService.executeChore(choreId);

        // Then
        assertEquals(dto, result);
        verify(choreExecutionService, times(1)).executeChore(chore, executor);
    }
}
