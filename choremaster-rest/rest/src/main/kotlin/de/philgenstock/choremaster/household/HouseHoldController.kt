package de.philgenstock.choremaster.household

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/household")
class HouseHoldController(
    private val houseHoldApplicationService: HouseHoldApplicationService,
) {
    @GetMapping
    fun getHouseHolds(): List<HouseHoldDto> = houseHoldApplicationService.getHouseHolds()
}
