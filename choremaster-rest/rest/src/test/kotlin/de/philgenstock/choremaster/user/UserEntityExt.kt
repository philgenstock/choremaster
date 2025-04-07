package de.philgenstock.choremaster.user

import java.time.Instant

fun UserEntity.Companion.create(
    lastLogin: Instant = Instant.now(),
    createdDate: Instant = Instant.now(),
    firstName: String = "firstName",
    lastName: String = "lastName",
    email: String = "email",
) = UserEntity(
    lastLogin = lastLogin,
    createdDate = createdDate,
    firstName = firstName,
    lastName = lastName,
    email = email,
)
