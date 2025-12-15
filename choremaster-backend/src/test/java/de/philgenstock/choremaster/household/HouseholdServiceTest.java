package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.user.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static de.philgenstock.choremaster.household.HouseholdBuilder.aHousehold;
import static de.philgenstock.choremaster.user.UserBuilder.aUser;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class HouseholdServiceTest {

    @Mock
    private HouseholdRepository householdRepository;

    @InjectMocks
    private HouseholdService householdService;

    @Test
    void getHouseholdsForUser_shouldReturnCopyOfUserHouseholds() {
        // Given
        User user = aUser().build();
        Household household1 = aHousehold().withName("Household 1").build();
        Household household2 = aHousehold().withName("Household 2").build();

        Set<Household> households = new HashSet<>();
        households.add(household1);
        households.add(household2);
        user.setHouseholds(households);

        // When
        List<Household> result = householdService.getHouseholdsForUser(user);

        // Then
        assertThat(result)
                .containsExactlyInAnyOrder(household1, household2);
    }

    @Test
    void createHousehold_shouldCreateAndSaveHousehold() {
        // Given
        String householdName = "New Household";
        User owner = aUser().build();
        owner.setHouseholds(new HashSet<>());

        Household savedHousehold = aHousehold()
                .withName(householdName)
                .withOwner(owner)
                .build();

        when(householdRepository.save(any(Household.class))).thenReturn(savedHousehold);

        // When
        Household result = householdService.createHousehold(householdName, owner);

        // Then
        assertThat(result)
                .extracting(Household::getName, Household::getOwner)
                .containsExactly(householdName, owner);

        ArgumentCaptor<Household> householdCaptor = ArgumentCaptor.forClass(Household.class);
        verify(householdRepository, times(1)).save(householdCaptor.capture());

        Household capturedHousehold = householdCaptor.getValue();
        assertThat(capturedHousehold)
                .extracting(Household::getName, Household::getOwner)
                .containsExactly(householdName, owner);
    }
}
