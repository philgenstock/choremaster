package de.philgenstock.choremaster.data.api

import de.philgenstock.choremaster.data.model.Household
import retrofit2.Response
import retrofit2.http.GET

interface HouseholdApiService {
    @GET("/api/household/all")
    suspend fun getAllHouseholds(): Response<List<Household>>
}
