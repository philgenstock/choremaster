package de.philgenstock.choremaster.household

fun HouseHoldEntity.toDto() =
    HouseHoldDto(
        id = id!!,
        name = name,
    )
