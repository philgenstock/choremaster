package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.user.User;
import de.philgenstock.choremaster.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class HouseholdApplicationService {

    private final UserService userService;
    private final HouseholdService householdService;
    private final HouseholdConvertService householdConvertService;

    public List<HouseholdDto> getHouseholdsForCurrentUser() {
        User user = userService.getCurrentUser();
        return householdService.getHouseholdsForUser(user).stream()
                .map(householdConvertService::toDto)
                .toList();
    }

    @Transactional
    public HouseholdDto createHouseholdForCurrentUser(CreateHouseholdRequest createHouseholdRequest) {
        User user = userService.getCurrentUser();
        Household household = householdService.createHousehold(createHouseholdRequest.name(), user);
        return householdConvertService.toDto(household);
    }
}
