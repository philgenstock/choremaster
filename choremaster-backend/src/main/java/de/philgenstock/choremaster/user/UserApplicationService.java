package de.philgenstock.choremaster.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserApplicationService {

    private final UserService userService;

    public void login(UserDto userDto) {
        userService.login(userDto);
    }

}
