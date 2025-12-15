package de.philgenstock.choremaster.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static de.philgenstock.choremaster.user.UserBuilder.aUser;
import static org.assertj.core.api.Assertions.assertThat;

class UserConvertServiceTest {

    private UserConvertService userConvertService;

    @BeforeEach
    void setUp() {
        userConvertService = new UserConvertService();
    }

    @Test
    void toDto_shouldConvertUserToUserDto() {
        // Given
        User user = aUser()
                .withName("John Doe")
                .withEmail("john.doe@example.com")
                .build();

        // When
        UserDto result = userConvertService.toDto(user);

        // Then
        assertThat(result)
                .extracting(UserDto::name, UserDto::email)
                .containsExactly("John Doe", "john.doe@example.com");
    }


    @Test
    void toNewUser_shouldConvertUserDtoToUser() {
        // Given
        UserDto userDto = new UserDto("Alice Smith", "alice.smith@example.com");

        // When
        User result = userConvertService.toNewUser(userDto);

        // Then
        assertThat(result)
                .extracting(User::getName, User::getEmail)
                .containsExactly("Alice Smith", "alice.smith@example.com");
    }
}
