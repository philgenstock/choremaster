package de.philgenstock.choremaster.chore;

import de.philgenstock.choremaster.household.Household;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static de.philgenstock.choremaster.chore.ChoreBuilder.aChore;
import static de.philgenstock.choremaster.household.HouseholdBuilder.aHousehold;
import static org.assertj.core.api.Assertions.assertThat;

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
        assertThat(result)
                .extracting(ChoreDto::id, ChoreDto::name)
                .containsExactly(1L, "Clean the kitchen");
    }

    @Test
    void toNewChore_shouldConvertChoreDtoToChore() {
        // Given
        Household household = aHousehold().build();
        ChoreDto choreDto = new ChoreDto(5L, "Do the laundry");

        // When
        Chore result = choreConvertService.toNewChore(choreDto, household);

        // Then
        assertThat(result)
                .extracting(Chore::getName, Chore::getHousehold)
                .containsExactly("Do the laundry", household);
    }
}
