package de.philgenstock.choremaster.user

import com.fasterxml.jackson.databind.ObjectMapper
import de.philgenstock.choremaster.security.JwtTokenProvider
import de.philgenstock.choremaster.util.Clock
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.junit.jupiter.MockitoExtension
import org.mockito.kotlin.whenever
import org.springframework.web.client.RestTemplate
import java.time.Instant

@ExtendWith(MockitoExtension::class)
class UserServiceTest {
    private lateinit var testee: UserService

    @Mock
    private lateinit var userRepository: UserRepository

    @Mock
    private lateinit var restTemplate: RestTemplate

    @Mock
    private lateinit var clock: Clock

    @Mock
    private lateinit var jwtTokenProvider: JwtTokenProvider

    @Mock
    private lateinit var objectMapper: ObjectMapper

    @BeforeEach
    fun setUp() {
        testee =
            UserService(
                userRepository = userRepository,
                restTemplate = restTemplate,
                clock = clock,
                jwtTokenProvider = jwtTokenProvider,
                objectMapper = objectMapper,
            )
    }

    @Test
    fun `should login user`() {
        // given
        val now = Instant.now()
        whenever(clock.now()).thenReturn(now)

        val googleToken = "googleToken"
        // when
        testee.login(googleToken)
    }
}
