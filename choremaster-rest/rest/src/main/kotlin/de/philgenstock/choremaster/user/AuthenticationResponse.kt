package de.philgenstock.choremaster.user

data class AuthenticationResponse(
    val token: String,
    val displayName: String,
)
