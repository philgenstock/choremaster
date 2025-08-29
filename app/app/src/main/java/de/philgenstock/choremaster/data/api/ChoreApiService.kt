package de.philgenstock.choremaster.data.api

import de.philgenstock.choremaster.data.model.Chore
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface ChoreApiService {
    @GET("/api/chore/household/{houseHoldId}")
    suspend fun getChoresFor(
        @Path("houseHoldId") houseHoldId: Long,
    ): Response<List<Chore>>
}
