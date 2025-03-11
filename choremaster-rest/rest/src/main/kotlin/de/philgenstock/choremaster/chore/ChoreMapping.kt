package de.philgenstock.choremaster.chore

fun ChoreEntity.toDto(): ChoreDto =
    ChoreDto(
        name = name,
        id = id!!,
    )
