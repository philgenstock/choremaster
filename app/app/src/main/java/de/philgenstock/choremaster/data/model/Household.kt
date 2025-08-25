package de.philgenstock.choremaster.data.model

import com.google.gson.annotations.SerializedName

data class Household(
    @SerializedName("id")
    val id: String,
    @SerializedName("name")
    val name: String,
)
