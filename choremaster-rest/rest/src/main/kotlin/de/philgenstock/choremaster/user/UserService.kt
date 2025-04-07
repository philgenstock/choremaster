package de.philgenstock.choremaster.user

import com.fasterxml.jackson.annotation.JsonProperty
import com.fasterxml.jackson.databind.ObjectMapper
import de.philgenstock.choremaster.exception.UnauthorizedException
import de.philgenstock.choremaster.security.JwtTokenProvider
import de.philgenstock.choremaster.util.Clock
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate

@Component
class UserService(
    private val userRepository: UserRepository,
    private val restTemplate: RestTemplate,
    private val clock: Clock,
    private val jwtTokenProvider: JwtTokenProvider,
    private val objectMapper: ObjectMapper,
) {
    fun login(googleToken: String): AuthenticationResponse {
        val principalResponseJson =
            restTemplate
                .getForEntity(
                    "https://oauth2.googleapis.com/tokeninfo?id_token=$googleToken",
                    String::class.java,
                ).body ?: throw UnauthorizedException()

        val principalResponse = objectMapper.readValue(principalResponseJson, GooglePrincipalResponse::class.java)

        val userEntity =
            userRepository.findOrCreateUser(
                firstName = principalResponse.givenName,
                lastName = principalResponse.familyName,
                email = principalResponse.email,
                now = clock.now(),
            )

        val token = jwtTokenProvider.generateToken(userEntity)
        return AuthenticationResponse(
            token = "Bearer $token",
            displayName = userEntity.firstName,
        )
    }
}

data class GooglePrincipalResponse(
    @JsonProperty("given_name")
    val givenName: String,
    @JsonProperty("family_name")
    val familyName: String,
    val email: String,
)
