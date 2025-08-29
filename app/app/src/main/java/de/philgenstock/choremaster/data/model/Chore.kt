package de.philgenstock.choremaster.data.model

import kotlinx.serialization.SerialName

data class Chore(
    @SerialName("id")
    val id: Long,
    @SerialName("name")
    val name: String,
)
