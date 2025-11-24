package de.philgenstock.choremaster.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserConvertService userConvertService;

    public User login(UserDto userDto) {
        return userRepository.findByEmail(userDto.email())
                .orElseGet(() -> {
                    User user = userConvertService.toNewUser(userDto);
                    userRepository.save(user);
                    return user;
                });
    }
}
