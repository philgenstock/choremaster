package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import de.philgenstock.choremaster.household.HouseholdRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static de.philgenstock.choremaster.chore.ChoreBuilder.aChore;
import static de.philgenstock.choremaster.household.HouseholdBuilder.aHousehold;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChoreApplicationServiceTest {

    @Mock
    private ChoreService choreService;

    @Mock
    private ChoreConvertService choreConvertService;

    @Mock
    private HouseholdRepository householdRepository;

    @InjectMocks
    private ChoreApplicationService choreApplicationService;

    @Test
    void getChoresByHouseholdId_shouldReturnChoresForHouseholdAsDtos() {
        // Given
        Long householdId = 10L;
        Household household = aHousehold().withId(householdId).build();
        Chore chore1 = aChore()
                .withName("Clean the kitchen")
                .withHousehold(household)
                .build();
        Chore chore2 = aChore()
                .withId(2L)
                .withName("Do the laundry")
                .withHousehold(household)
                .build();

        ChoreDto choreDto1 = new ChoreDto(1L, "Clean the kitchen");
        ChoreDto choreDto2 = new ChoreDto(2L, "Do the laundry");

        when(householdRepository.findById(householdId)).thenReturn(Optional.of(household));
        when(choreService.getChoresByHousehold(household)).thenReturn(List.of(chore1, chore2));
        when(choreConvertService.toDto(chore1)).thenReturn(choreDto1);
        when(choreConvertService.toDto(chore2)).thenReturn(choreDto2);

        // When
        List<ChoreDto> result = choreApplicationService.getChoresByHouseholdId(householdId);

        // Then
        assertThat(result)
                .containsExactlyInAnyOrder(choreDto1, choreDto2);
        verify(householdRepository, times(1)).findById(householdId);
        verify(choreService, times(1)).getChoresByHousehold(household);
    }

    @Test
    void getChoresByHouseholdId_shouldReturnEmptyListWhenNoChoresExistForHousehold() {
        // Given
        Long householdId = 10L;
        Household household = aHousehold().withId(householdId).build();
        when(householdRepository.findById(householdId)).thenReturn(Optional.of(household));
        when(choreService.getChoresByHousehold(household)).thenReturn(List.of());

        // When
        List<ChoreDto> result = choreApplicationService.getChoresByHouseholdId(householdId);

        // Then
        assertThat(result)
                .isEmpty();
        verify(householdRepository, times(1)).findById(householdId);
        verify(choreService, times(1)).getChoresByHousehold(household);
    }

    @Test
    void getChoresByHouseholdId_shouldThrowExceptionWhenHouseholdNotFound() {
        // Given
        Long householdId = 10L;
        when(householdRepository.findById(householdId)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> choreApplicationService.getChoresByHouseholdId(householdId))
                .isInstanceOf(IllegalArgumentException.class);
        verify(householdRepository, times(1)).findById(householdId);
        verify(choreService, never()).getChoresByHousehold(any());
    }

    @Test
    void createChore_shouldCreateChoreAndReturnDto() {
        // Given
        CreateChoreRequest request = new CreateChoreRequest("Vacuum the living room", 10L);
        Household household = aHousehold().withId(10L).build();
        Chore chore = aChore()
                .withName("Vacuum the living room")
                .withHousehold(household)
                .build();
        ChoreDto choreDto = new ChoreDto(1L, "Vacuum the living room");

        when(householdRepository.findById(10L)).thenReturn(Optional.of(household));
        when(choreService.createChore("Vacuum the living room", household)).thenReturn(chore);
        when(choreConvertService.toDto(chore)).thenReturn(choreDto);

        // When
        ChoreDto result = choreApplicationService.createChore(request);

        // Then
        assertThat(result)
                .isEqualTo(choreDto);
        verify(householdRepository, times(1)).findById(10L);
        verify(choreService, times(1)).createChore("Vacuum the living room", household);
        verify(choreConvertService, times(1)).toDto(chore);
    }

    @Test
    void createChore_shouldThrowExceptionWhenHouseholdNotFound() {
        // Given
        CreateChoreRequest request = new CreateChoreRequest("Vacuum the living room", 10L);
        when(householdRepository.findById(10L)).thenReturn(Optional.empty());

        // When & Then
        assertThatThrownBy(() -> choreApplicationService.createChore(request))
                .isInstanceOf(IllegalArgumentException.class);
        verify(householdRepository, times(1)).findById(10L);
        verify(choreService, never()).createChore(anyString(), any());
    }

    @Test
    void deleteChore_shouldDeleteChore() {
        // Given
        Long choreId = 1L;

        // When
        choreApplicationService.deleteChore(choreId);

        // Then
        verify(choreService, times(1)).deleteChore(choreId);
    }
}
