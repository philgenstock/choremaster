package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.chore.execution.ChoreExecution;
import de.philgenstock.choremaster.chore.execution.ChoreExecutionConvertService;
import de.philgenstock.choremaster.chore.execution.ChoreExecutionDto;
import de.philgenstock.choremaster.household.Household;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static de.philgenstock.choremaster.chore.ChoreBuilder.aChore;
import static de.philgenstock.choremaster.household.HouseholdBuilder.aHousehold;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ChoreConvertServiceTest {

    private ChoreConvertService choreConvertService;

    @Mock
    private ChoreExecutionConvertService choreExecutionConvertService;

    @BeforeEach
    void setUp() {
        choreConvertService = new ChoreConvertService(choreExecutionConvertService);
    }

    @Test
    void toDto_shouldConvertChoreToChoreDto() {
        // Given
        Household household = aHousehold().withId(10L).build();
        ChoreExecution choreExecution = new ChoreExecution();
        Chore chore = aChore()
                .withName("Clean the kitchen")
                .withHousehold(household)
                .withLastExecution(choreExecution)
                .build();
        LocalDateTime executedAt = LocalDateTime.of(2024, 3, 15, 14, 30);
        ChoreExecutionDto executionDto = new ChoreExecutionDto(1L, "John Doe", executedAt);

        when(choreExecutionConvertService.toDto(choreExecution)).thenReturn(executionDto);

        // When
        ChoreDto result = choreConvertService.toDto(chore);

        // Then
        assertThat(result)
                .extracting(ChoreDto::id, ChoreDto::name, ChoreDto::intervalDays, ChoreDto::lastExecution)
                .containsExactly(1L, "Clean the kitchen", 7, executionDto);
    }

    @Test
    void toNewChore_shouldConvertChoreDtoToChore() {
        // Given
        Household household = aHousehold().build();
        ChoreDto choreDto = new ChoreDto(5L, "Do the laundry", 3, null);

        // When
        Chore result = choreConvertService.toNewChore(choreDto, household);

        // Then
        assertThat(result)
                .extracting(Chore::getName, Chore::getHousehold, Chore::getIntervalDays)
                .containsExactly("Do the laundry", household, 3);
    }
}
