package de.philgenstock.choremaster.user;

import de.philgenstock.choremaster.security.TokenService;
import lombok.AllArgsConstructor;
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
}
