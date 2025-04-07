package de.philgenstock.choremaster.user

import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import java.time.Instant

interface UserRepository : CrudRepository<UserEntity, Long> {
    @Query(
        nativeQuery = true,
        value =
            "INSERT INTO users(first_name, last_name, email, last_login, created_date) " +
                "VALUES (:firstName, :lastName, :email, :now,:now)" +
                "ON CONFLICT (email) DO UPDATE SET last_login=:now RETURNING *",
    )
    fun findOrCreateUser(
        firstName: String,
        lastName: String,
        email: String,
        now: Instant,
    ): UserEntity

    fun findByEmail(username: String): UserEntity?
}
