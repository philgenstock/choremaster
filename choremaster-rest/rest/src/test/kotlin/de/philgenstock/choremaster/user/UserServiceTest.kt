package de.philgenstock.choremaster.user

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import de.philgenstock.choremaster.exception.UnauthorizedException
import de.philgenstock.choremaster.security.JwtTokenProvider
import de.philgenstock.choremaster.util.Clock
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.Mock
import org.mockito.junit.jupiter.MockitoExtension
import org.mockito.kotlin.whenever
import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestTemplate
import java.time.Instant
import java.util.Optional

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

    private val objectMapper: ObjectMapper = jacksonObjectMapper()

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

        val givenName = "Patrick"
        val familyName = "Hilgenstock"
        val email = "patrick.example@org.de"
        val googlePrincipalResponse =
            GooglePrincipalResponse(
                givenName = givenName,
                familyName = familyName,
                email = email,
            )

        whenever(
            restTemplate
                .getForEntity(
                    "https://oauth2.googleapis.com/tokeninfo?id_token=$googleToken",
                    String::class.java,
                ),
        ).thenReturn(ResponseEntity.of(Optional.of(objectMapper.writeValueAsString(googlePrincipalResponse))))

        val user =
            UserEntity.create(
                firstName = givenName,
            )

        whenever(
            userRepository.findOrCreateUser(
                firstName = givenName,
                lastName = familyName,
                email = email,
                now = now,
            ),
        ).thenReturn(user)

        val generatedToken = "token"
        whenever(
            jwtTokenProvider.generateToken(user),
        ).thenReturn(generatedToken)

        // when
        val result = testee.login(googleToken)

        // then
        assertThat(result)
            .returns("Bearer token", AuthenticationResponse::token)
            .returns(givenName, AuthenticationResponse::displayName)
    }

    @Test
    fun `should throw if google token is invalid`() {
        // given
        val googleToken = "googleToken"
        whenever(
            restTemplate
                .getForEntity(
                    "https://oauth2.googleapis.com/tokeninfo?id_token=$googleToken",
                    String::class.java,
                ),
        ).thenReturn(ResponseEntity.of(Optional.empty()))

        // when/then
        assertThrows<UnauthorizedException> { testee.login(googleToken) }
    }
}
