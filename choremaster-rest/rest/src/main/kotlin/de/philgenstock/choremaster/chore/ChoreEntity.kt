package de.philgenstock.choremaster.chore

import de.philgenstock.choremaster.household.HouseHoldEntity
import jakarta.persistence.Entity
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = "chore")
data class ChoreEntity(
    @Id @GeneratedValue
    var id: Long? = null,
    var name: String,
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "household_id", nullable = false)
    var houseHoldEntity: HouseHoldEntity,
)
