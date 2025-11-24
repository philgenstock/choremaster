package de.philgenstock.choremaster.develop;

import de.philgenstock.choremaster.household.Household;
import de.philgenstock.choremaster.household.HouseholdRepository;
import de.philgenstock.choremaster.user.User;
import de.philgenstock.choremaster.user.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("local")
@AllArgsConstructor
public class DevelopTestData {

    private final UserRepository userRepository;
    private final HouseholdRepository householdRepository;

    @PostConstruct
    public void setupTestData() {

        if (userRepository.count() != 0) {
            return;
        }
        User patrick = new User("Patrick", "pahilgenstock@gmail.com");
        patrick = userRepository.save(patrick);

        Household glinde = new Household(
                "Glinde", patrick
        );
        glinde = householdRepository.save(glinde);

        patrick.addHousehold(glinde);
        userRepository.save(patrick);
    }
}
