package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static de.philgenstock.choremaster.household.HouseholdBuilder.aHousehold;
import static de.philgenstock.choremaster.user.UserBuilder.aUser;
import static org.assertj.core.api.Assertions.assertThat;

class HouseholdConvertServiceTest {

    private HouseholdConvertService householdConvertService;

    @BeforeEach
    void setUp() {
        householdConvertService = new HouseholdConvertService();
    }

    @Test
    void toDto_shouldConvertHouseholdToHouseholdDto() {
        // Given
        Household household = aHousehold()
                .withName("Doe Family")
                .build();

        // When
        HouseholdDto result = householdConvertService.toDto(household);

        // Then
        assertThat(result)
                .extracting(HouseholdDto::id, HouseholdDto::name)
                .containsExactly(1L, "Doe Family");
    }

    @Test
    void toNewHousehold_shouldConvertHouseholdDtoToHousehold() {
        // Given
        User owner = aUser().build();
        HouseholdDto householdDto = new HouseholdDto(5L, "Johnson Family");

        // When
        Household result = householdConvertService.toNewHousehold(householdDto, owner);

        // Then
        assertThat(result)
                .extracting(Household::getName, Household::getOwner)
                .containsExactly("Johnson Family", owner);
    }

}
