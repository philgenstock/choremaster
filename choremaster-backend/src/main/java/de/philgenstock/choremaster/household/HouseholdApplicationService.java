package de.philgenstock.choremaster.household;

import de.philgenstock.choremaster.user.User;
import de.philgenstock.choremaster.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class HouseholdApplicationService {

    private final UserRepository userRepository;
    private final HouseholdService householdService;
    private final HouseholdConvertService householdConvertService;

    public List<HouseholdDto> getHouseholdsForCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return householdService.getHouseholdsForUser(user).stream()
                .map(householdConvertService::toDto)
                .toList();
    }
}
