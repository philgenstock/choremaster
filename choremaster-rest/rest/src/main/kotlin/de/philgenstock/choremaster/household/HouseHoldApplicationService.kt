package de.philgenstock.choremaster.household

import org.springframework.stereotype.Service

@Service
class HouseHoldApplicationService(
    private val houseHoldRepository: HouseHoldRepository,
) {
    fun getHouseHolds() =
        houseHoldRepository
            .findAll()
            .stream()
            .map(HouseHoldEntity::toDto)
            .toList()
}
