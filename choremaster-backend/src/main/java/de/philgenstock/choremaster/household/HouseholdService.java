package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class HouseholdService {

    public List<Household> getHouseholdsForUser(User user) {


        return List.copyOf(user.getHouseholds());
    }

}