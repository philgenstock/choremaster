package de.philgenstock.choremaster.develop

import de.philgenstock.choremaster.chore.ChoreEntity
import de.philgenstock.choremaster.chore.ChoreRepository
import de.philgenstock.choremaster.household.HouseHoldEntity
import de.philgenstock.choremaster.household.HouseHoldRepository
import de.philgenstock.choremaster.user.UserEntity
import de.philgenstock.choremaster.user.UserRepository
import de.philgenstock.choremaster.util.Clock
import jakarta.annotation.PostConstruct
import org.springframework.stereotype.Component

@Component
class DevelopDataProvider(
    private val houseHoldRepository: HouseHoldRepository,
    private val choreRepository: ChoreRepository,
    private val userRepository: UserRepository,
    private val clock: Clock,
) {
    @PostConstruct
    fun setupData() {
        if (houseHoldRepository.count() == 0L) {
            val now = clock.now()
            val user =
                userRepository.save(
                    UserEntity(
                        firstName = "Patrick",
                        lastName = "Hilgenstock",
                        email = "pahilgenstock@gmail.com",
                        createdDate = now,
                        lastLogin = now,
                    ),
                )
            val houseHold =
                houseHoldRepository.save(
                    HouseHoldEntity(
                        name = "Home",
                        owner = user,
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
