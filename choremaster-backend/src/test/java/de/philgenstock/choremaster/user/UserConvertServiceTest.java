package de.philgenstock.choremaster.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static de.philgenstock.choremaster.user.UserBuilder.aUser;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

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
        assertNotNull(result);
        assertEquals("John Doe", result.name());
        assertEquals("john.doe@example.com", result.email());
    }


    @Test
    void toNewUser_shouldConvertUserDtoToUser() {
        // Given
        UserDto userDto = new UserDto("Alice Smith", "alice.smith@example.com");

        // When
        User result = userConvertService.toNewUser(userDto);

        // Then
        assertNotNull(result);
        assertEquals("Alice Smith", result.getName());
        assertEquals("alice.smith@example.com", result.getEmail());
    }
}
