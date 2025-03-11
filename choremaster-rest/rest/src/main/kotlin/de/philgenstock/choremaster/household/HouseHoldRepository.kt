package de.philgenstock.choremaster.household

import org.springframework.data.repository.ListCrudRepository

interface HouseHoldRepository : ListCrudRepository<HouseHoldEntity, Long>
