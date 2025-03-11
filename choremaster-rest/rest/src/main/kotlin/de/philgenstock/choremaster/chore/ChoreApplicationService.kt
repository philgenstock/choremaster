package de.philgenstock.choremaster.chore

import de.philgenstock.choremaster.exception.NotFoundException
import de.philgenstock.choremaster.household.HouseHoldRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component

@Component
class ChoreApplicationService(
    private val choreRepository: ChoreRepository,
    private val houseHoldRepository: HouseHoldRepository,
) {
    fun getChoresForHouseHold(houseHoldId: Long): List<ChoreDto> {
        val houseHold = houseHoldRepository.findByIdOrNull(houseHoldId) ?: throw NotFoundException()
        return choreRepository
            .findByHouseHoldEntity(houseHold)
            .map(ChoreEntity::toDto)
    }
}
