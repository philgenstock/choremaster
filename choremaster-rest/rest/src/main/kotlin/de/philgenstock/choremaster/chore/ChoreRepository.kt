package de.philgenstock.choremaster.chore

import de.philgenstock.choremaster.household.HouseHoldEntity
import org.springframework.data.repository.CrudRepository

interface ChoreRepository : CrudRepository<ChoreEntity, Long> {
    fun findByHouseHoldEntity(houseHoldEntity: HouseHoldEntity): MutableList<ChoreEntity>
}
