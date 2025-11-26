package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class HouseholdService {

    private final HouseholdRepository householdRepository;

    public List<Household> getHouseholdsForUser(User user) {
        return List.copyOf(user.getHouseholds());
    }

    public Household createHousehold(String name, User owner) {
        Household household = new Household(name, owner);
        household = householdRepository.save(household);
        owner.getHouseholds().add(household);
        return household;
    }

}