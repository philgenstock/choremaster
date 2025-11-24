package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.user.User;
import org.springframework.stereotype.Service;

@Service
public class HouseholdConvertService {

    public HouseholdDto toDto(Household household) {
        return new HouseholdDto(
                household.getId(),
                household.getName()
        );
    }

    public Household toNewHousehold(HouseholdDto householdDto, User owner) {
        Household household = new Household();
        household.setName(householdDto.name());
        household.setOwner(owner);
        return household;
    }
}
