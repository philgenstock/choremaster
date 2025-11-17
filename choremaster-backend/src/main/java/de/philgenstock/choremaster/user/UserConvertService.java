package de.philgenstock.choremaster.user;

import org.springframework.stereotype.Service;

@Service
public class UserConvertService {

    public UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

    public User toNewUser(UserDto userDto) {
        User user = new User();
        user.setName(userDto.name());
        user.setEmail(userDto.email());
        return user;
    }
}
