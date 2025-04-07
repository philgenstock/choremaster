package de.philgenstock.choremaster.util

import org.springframework.stereotype.Component
import java.time.Instant
import java.util.Date

@Component
class ProductiveClock : Clock {
    override fun now(): Instant = Instant.now()

    override fun today(): Date = Date()
}
