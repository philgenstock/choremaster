package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static de.philgenstock.choremaster.chore.ChoreBuilder.aChore;
import static de.philgenstock.choremaster.household.HouseholdBuilder.aHousehold;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class ChoreConvertServiceTest {

    private ChoreConvertService choreConvertService;

    @BeforeEach
    void setUp() {
        choreConvertService = new ChoreConvertService();
    }

    @Test
    void toDto_shouldConvertChoreToChoreDto() {
        // Given
        Household household = aHousehold().withId(10L).build();
        Chore chore = aChore()
                .withName("Clean the kitchen")
                .withHousehold(household)
                .build();

        // When
        ChoreDto result = choreConvertService.toDto(chore);

        // Then
        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("Clean the kitchen", result.name());
    }

    @Test
    void toNewChore_shouldConvertChoreDtoToChore() {
        // Given
        Household household = aHousehold().build();
        ChoreDto choreDto = new ChoreDto(5L, "Do the laundry");

        // When
        Chore result = choreConvertService.toNewChore(choreDto, household);

        // Then
        assertNotNull(result);
        assertEquals("Do the laundry", result.getName());
        assertEquals(household, result.getHousehold());
    }
}
