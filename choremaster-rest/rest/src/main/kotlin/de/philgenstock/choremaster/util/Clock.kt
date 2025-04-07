package de.philgenstock.choremaster.util

import java.time.Instant
import java.util.Date

interface Clock {
    fun now(): Instant

    fun today(): Date
}
