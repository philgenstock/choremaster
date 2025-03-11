package de.philgenstock.choremaster.develop

import de.philgenstock.choremaster.chore.ChoreEntity
import de.philgenstock.choremaster.chore.ChoreRepository
import de.philgenstock.choremaster.household.HouseHoldEntity
import de.philgenstock.choremaster.household.HouseHoldRepository
import jakarta.annotation.PostConstruct
import org.springframework.stereotype.Component

@Component
class DevelopDataProvider(
    private val houseHoldRepository: HouseHoldRepository,
    private val choreRepository: ChoreRepository,
) {
    @PostConstruct
    fun setupData() {
        if (houseHoldRepository.count() == 0L) {
            val houseHold =
                houseHoldRepository.save(
                    HouseHoldEntity(
                        name = "Home",
                    ),
                )

            choreRepository.saveAll(
                listOf(
                    ChoreEntity(
                        name = "Saugen",
                        houseHoldEntity = houseHold,
                    ),
                    ChoreEntity(
                        name = "Wischen",
                        houseHoldEntity = houseHold,
                    ),
                ),
            )
        }
    }
}
