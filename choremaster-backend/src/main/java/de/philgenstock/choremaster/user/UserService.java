package de.philgenstock.choremaster.user;

import de.philgenstock.choremaster.security.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserConvertService userConvertService;
    private final TokenService tokenService;

    public User login(String token) {
        UserDto userDto = tokenService.getUserFromToken(token);

        return userRepository.findByEmail(userDto.email())
                .orElseGet(() -> {
                    User user = userConvertService.toNewUser(userDto);
                    userRepository.save(user);
                    return user;
                });
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
