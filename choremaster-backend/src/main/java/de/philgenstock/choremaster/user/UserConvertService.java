package de.philgenstock.choremaster.user;

import org.springframework.stereotype.Service;

@Service
public class UserConvertService {

    public UserDto toDto(User user) {
        return new UserDto(
                user.getName(),
                user.getEmail()
        );
    }

    public User toNewUser(UserDto userDto) {
        return new User(userDto.name(), userDto.email());
    }
}
