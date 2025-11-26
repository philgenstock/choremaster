package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static de.philgenstock.choremaster.chore.ChoreBuilder.aChore;
import static de.philgenstock.choremaster.household.HouseholdBuilder.aHousehold;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ChoreServiceTest {

    @Mock
    private ChoreRepository choreRepository;

    @InjectMocks
    private ChoreService choreService;

    @Test
    void getAllChores_shouldReturnAllChores() {
        // Given
        Chore chore1 = aChore()
                .withName("Clean the kitchen")
                .withHousehold(aHousehold().build())
                .build();
        Chore chore2 = aChore()
                .withName("Do the laundry")
                .withHousehold(aHousehold().build())
                .build();

        List<Chore> chores = List.of(chore1, chore2);
        when(choreRepository.findAll()).thenReturn(chores);

        // When
        List<Chore> result = choreService.getAllChores();

        // Then
        assertNotNull(result);
        assertEquals(2, result.size());
        assertTrue(result.contains(chore1));
        assertTrue(result.contains(chore2));
    }

    @Test
    void getAllChores_shouldReturnEmptyListWhenNoChoresExist() {
        // Given
        when(choreRepository.findAll()).thenReturn(List.of());

        // When
        List<Chore> result = choreService.getAllChores();

        // Then
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    @Test
    void createChore_shouldCreateAndSaveChore() {
        // Given
        String choreName = "Clean the bathroom";
        Household household = aHousehold().build();

        Chore savedChore = aChore()
                .withName(choreName)
                .withHousehold(household)
                .build();

        when(choreRepository.save(any(Chore.class))).thenReturn(savedChore);

        // When
        Chore result = choreService.createChore(choreName, household);

        // Then
        assertEquals(choreName, result.getName());
        assertEquals(household, result.getHousehold());

        ArgumentCaptor<Chore> choreCaptor = ArgumentCaptor.forClass(Chore.class);
        verify(choreRepository, times(1)).save(choreCaptor.capture());

        Chore capturedChore = choreCaptor.getValue();
        assertEquals(choreName, capturedChore.getName());
        assertEquals(household, capturedChore.getHousehold());
    }

    @Test
    void deleteChore_shouldDeleteChoreById() {
        // Given
        Long choreId = 1L;

        // When
        choreService.deleteChore(choreId);

        // Then
        verify(choreRepository, times(1)).deleteById(choreId);
    }
}
