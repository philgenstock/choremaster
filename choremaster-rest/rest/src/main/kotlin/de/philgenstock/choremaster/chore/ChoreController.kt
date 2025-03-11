package de.philgenstock.choremaster.chore

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/chore")
class ChoreController(
    private val choreApplicationService: ChoreApplicationService,
) {
    @GetMapping("/household/{houseHoldId}")
    fun getChoresForHouseHold(
        @PathVariable("houseHoldId") houseHoldId: Long,
    ): List<ChoreDto> = choreApplicationService.getChoresForHouseHold(houseHoldId)
}
