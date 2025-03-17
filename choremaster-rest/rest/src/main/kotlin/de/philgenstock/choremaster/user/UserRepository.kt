package de.philgenstock.choremaster.user

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import java.time.Instant

interface UserRepository : CrudRepository<UserEntity, Long> {
    @Query(
        "INSERT INTO users(firstName, lastName, email, lastLogin, createdDate) " +
            "VALUES (:firstName, :lastName, :email, now,now)" +
            "ON CONFLICT (email) DO UPDATE SET lastLogin=:now RETURNING *",
    )
    fun findOrCreateUser(
        firstName: String,
        lastName: String,
        email: String,
        now: Instant,
    ): UserEntity
}
