package de.philgenstock.choremaster.data.repository

import de.philgenstock.choremaster.data.api.HouseholdApiService
import de.philgenstock.choremaster.data.model.Household
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class HouseHoldRepository(
    private val householdApiService: HouseholdApiService,
) {
    suspend fun getAllHouseholds(): Result<List<Household>> =
        withContext(Dispatchers.IO) {
            try {
                val response = householdApiService.getAllHouseholds()

                if (response.isSuccessful) {
                    val households = response.body() ?: emptyList()
                    Result.success(households)
                } else {
                    Result.failure(Exception("Error fetching households: ${response.code()} ${response.message()}"))
                }
            } catch (e: Exception) {
                Result.failure(e)
            }
        }
}
