package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static de.philgenstock.choremaster.household.HouseholdBuilder.aHousehold;
import static de.philgenstock.choremaster.user.UserBuilder.aUser;
import static org.junit.jupiter.api.Assertions.*;

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
        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("Doe Family", result.name());
    }

    @Test
    void toNewHousehold_shouldConvertHouseholdDtoToHousehold() {
        // Given
        User owner = aUser().build();
        HouseholdDto householdDto = new HouseholdDto(5L, "Johnson Family");

        // When
        Household result = householdConvertService.toNewHousehold(householdDto, owner);

        // Then
        assertNotNull(result);
        assertEquals("Johnson Family", result.getName());
        assertEquals(owner, result.getOwner());
    }

}
