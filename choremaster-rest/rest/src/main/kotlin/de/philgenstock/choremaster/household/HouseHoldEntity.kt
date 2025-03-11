package de.philgenstock.choremaster.household

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "household")
data class HouseHoldEntity(
    @Id @GeneratedValue
    var id: Long? = null,
    var name: String,
)
